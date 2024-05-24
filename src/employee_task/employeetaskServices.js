const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateEmployeeTask } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");

const insertEmployeeTask = async (data) => {
  const value = validateEmployeeTask(data);
  await dbConfig.query("INSERT INTO employee_task VALUES($1,$2)", [
    value.task_id,
    value.user_id,
  ]);
  return await selectOneTaskEmployee(value.task_id);
};

const selectOneTaskEmployee = async (taskId) => {
  const result = await dbConfig.query(
    "SELECT * FROM employee_task WHERE task_id = $1",
    [taskId]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllEmployeeTask = async () => {
  const result = await dbConfig.query("SELECT * FROM employee_task");
  return result.rows;
};
const updateEmployeeTask = async (data, id) => {
  checkUpdateData(data);
  const condition = parseInt(id);
  await dbConfig.query(
    "UPDATE employee_task SET task_id = $1, user_id=$2 WHERE task_id = $3",
    [data.task_id, data.user_id, condition]
  );
  return await selectOneTaskEmployee(condition);
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
