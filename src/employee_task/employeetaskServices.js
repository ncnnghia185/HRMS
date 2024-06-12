const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateEmployeeTask } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");

const insertEmployeeTask = async (data) => {
  const value = validateEmployeeTask(data);
  const result = await dbConfig.query(
    "INSERT INTO employee_task VALUES($1,$2) RETURNING *",
    [value.task_id, value.user_id]
  );
  return result.rows[0];
};

const selectOneTaskEmployee = async (taskId) => {
  const result = await dbConfig.query(
    "SELECT * FROM employee_task WHERE task_id = $1",
    [taskId]
  );
  checkExistResult(result.rows);
  return result.rows;
};

const selectAllEmployeeTask = async () => {
  const result = await dbConfig.query("SELECT * FROM employee_task");
  return result.rows;
};
const updateEmployeeTask = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE projects SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
};
const deleteEmployeeTask = async (taskId) => {
  const condition = parseInt(taskId);
  await dbConfig.query("DELETE FROM employee_task WHERE task_id =$1", [
    condition,
  ]);
};
module.exports = {
  insertEmployeeTask,
  selectOneTaskEmployee,
  selectAllEmployeeTask,
  updateEmployeeTask,
  deleteEmployeeTask,
};
