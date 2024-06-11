const { dbConfig } = require("../../config/dbConnect");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { hashPassword } = require("../../utils/hashPassword");
const { validateUser } = require("../../utils/validateInput");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/token");
const bcrypt = require("bcrypt");

const insertUser = async (data) => {
  const value = validateUser(data);
  const hashed = await hashPassword(value.password);

  value.password = hashed;
  const result = await dbConfig.query(
    `INSERT INTO employees (id, name, address, birthday, email, phone, role_id, password, department_id) 
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      value.id,
      value.name,
      value.address,
      value.birthday,
      value.email,
      value.phone,
      value.role_id,
      value.password,
      value.department_id,
    ]
  );
  return result.rows[0];
};

const saveRefreshTokenToCookie = (response, refreshToken) => {
  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const login = async (data, response) => {
  // Validate data
  if (!data.email || !data.password)
    throw new Error("Missing email or password");

  // Check user exist
  const user = await dbConfig.query(
    // "SELECT * FROM users WHERE email = $1 OR username = $2",
    // "SELECT u.* FROM users u JOIN employees e ON u.email = e.email WHERE e.email = $1 OR u.username = $2",
    "SELECT * FROM employees WHERE email = $1 OR name = $2",
    [data.email, data.username]
  );

  if (user.rows.length === 0) {
    throw new Error("User not exist. Can not login to system");
  } else {
    // Compare input password vs user password in database
    const matchPassword = await bcrypt.compare(
      data.password,
      user.rows[0].password
    );
    if (!matchPassword) throw new Error("Wrong password. Please try again");

    // Generate access token
    const accessToken = generateAccessToken(
      user.rows[0]?.id,
      user.rows[0]?.role_id
    );
    const refreshToken = generateRefreshToken(user.rows[0]?.id);
    saveRefreshTokenToCookie(response, refreshToken);
    return {
      accessToken,
      user: user.rows[0],
    };
  }
};

const selectOneUser = async (id) => {
  const result = await dbConfig.query(
    "SELECT name, address, birthday, email, phone, role_id, department_id FROM employees WHERE id = $1",
    [id]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllUser = async () => {
  const result = await dbConfig.query(
    "SELECT id, name, address, birthday, email, phone, role_id, department_id FROM employees  ORDER BY id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const updateUser = async (data, id) => {
  checkUpdateData(data);
  const result = await dbConfig.query(
    `UPDATE employees SET , name = $1, address = $2, birthday = $3, email = $4, phone = $5, WHERE id = $6 
    RETURNING id, email, name, phone, address, birthday, role_id, department_id`,
    [data.name, data.address, data.birthday, data.email, data.phone, id]
  );

  return result.rows[0];
};

const deleteUser = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM employees WHERE id = $1", [condition]);
};

const userChangePassword = async (newPassword, id) => {
  const condition = parseInt(id);
  const user = await dbConfig.query(
    "SELECT password FROM employees WHERE id = $1",
    [condition]
  );
  const compare = await comparePassword(newPassword, user.rows[0].password);
  console.log("check compare", compare);
  const hashNewPassword = await hashPassword(newPassword);
  await dbConfig.query("UPDATE employees SET password = $1 WHERE id = $2", [
    hashNewPassword,
    condition,
  ]);
};

const userSelectDepartment = async (departmentName, userId) => {
  const allDepartments = await dbConfig.query("SELECT * FROM departments");

  const departmentNames = allDepartments.rows.map((item) => item.name);
  const checkExist = departmentNames.includes(departmentName);
  if (!checkExist) throw new Error("Error select department");
  const department = allDepartments.rows.find(
    (dept) => dept.name === departmentName
  );
  const departmentId = department.id;
  await dbConfig.query(
    "UPDATE employees SET department_id = $1 WHERE id = $2",
    [departmentId, userId]
  );
};

module.exports = {
  insertUser,
  login,
  selectOneUser,
  selectAllUser,
  updateUser,
  deleteUser,
  userChangePassword,
  userSelectDepartment,
};
