const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProjectTask } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");

const insertNewProjectTask = async (data) => {
  const value = validateProjectTask(data);
  const result = await dbConfig.query(
    "INSERT INTO project_task(description,name,project_id,task_status_id) VALUES($1,$2,$3,$4) RETURNING *",
    [value.description, value.name, value.project_id, value.task_status_id]
  );
  return result.rows[0];
};

const selectOneProjectTask = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(
    "SELECT * FROM project_task WHERE id = $1",
    [condition]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllProjectTasks = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM project_task ORDER BY id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const updateOneProjectTask = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE projects SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);

  return result.rows[0];
};
const deleteOneProjectTask = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM project_task WHERE id = $1", [condition]);
};

module.exports = {
  insertNewProjectTask,
  selectOneProjectTask,
  selectAllProjectTasks,
  updateOneProjectTask,
  deleteOneProjectTask,
};
