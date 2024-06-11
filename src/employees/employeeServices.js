const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateEmployee } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");
const insertNewEmployee = async (data) => {
  const value = validateEmployee(data);

  const result = await dbConfig.query(
    "INSERT INTO employees(id,address,birthday,email,name,phone,role_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [
      value.id,
      value.address,
      value.birthday,
      value.email,
      value.name,
      value.phone,
      value.role_id,
    ]
  );

  return result.rows[0];
};

const selectOneEmployee = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query("SELECT * FROM employees WHERE id = $1", [
    condition,
  ]);
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllEmployees = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM employees ORDER BY id ASC"
  );
  return result.rows;
};

const updateOneEmployee = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE projects SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
};

const deleteOneEmployee = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM employees WHERE id = $1", [condition]);
};

module.exports = {
  insertNewEmployee,
  selectOneEmployee,
  selectAllEmployees,
  updateOneEmployee,
  deleteOneEmployee,
};
