const {
  checkExistResult,
  checkUpdateData,
  permissionAddMember,
} = require("../../utils/handleQuery");
const { validateProjectEmployee } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");
const insertProjectEmployee = async (userId, data) => {
  const value = validateProjectEmployee(data);
  // Check role of userId

  const currentUser = await dbConfig.query(
    "SELECT r.name FROM employees e JOIN roles r ON e.role_id = r.id WHERE e.id = $1",
    [userId]
  );
  const currentRole = currentUser.rows[0].name.toLowerCase();

  // Check new member role
  const newMember = await dbConfig.query(
    "SELECT r.name FROM employees e JOIN roles r ON e.role_id = r.id WHERE e.id = $1",
    [value.user_id]
  );

  const newMemberRole = newMember.rows[0].name.toLowerCase();

  if (permissionAddMember(currentRole, newMemberRole)) {
    const result = await dbConfig.query(
      "INSERT INTO project_employees VALUES($1,$2,$3) RETURNING *",
      [value.project_id, value.project_role_id, value.user_id]
    );
    return result.rows[0];
  } else {
    throw new Error(
      `You don't have permission to add '${newMemberRole.toUpperCase()}' to this project`
    );
  }
};

const selectOneProjectEmployee = async (uId) => {
  const result = await dbConfig.query(
    "SELECT * FROM project_employees WHERE user_id = $1",
    [uId]
  );
  checkExistResult(result.rows);
  return result.rows;
};
const selectAllProjectEmployee = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM project_employees ORDER BY project_id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const countEmployeesJoinProject = async () => {
  const result = await dbConfig.query(
    "SELECT project_id,COUNT(user_id) FROM project_employees GROUP BY project_id"
  );
  checkExistResult(result.rows);
  return result.rows;
};
const countProjectEmployeeJoined = async () => {
  const result = await dbConfig.query(
    "SELECT user_id, COUNT(project_id) FROM project_employees GROUP BY user_id"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const updateProjectEmployee = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE projects SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
};

const deleteProjectEmployee = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM project_employees WHERE user_id = $1", [
    condition,
  ]);
};
module.exports = {
  insertProjectEmployee,
  selectOneProjectEmployee,
  selectAllProjectEmployee,
  updateProjectEmployee,
  deleteProjectEmployee,
  countProjectEmployeeJoined,
  countEmployeesJoinProject,
};
