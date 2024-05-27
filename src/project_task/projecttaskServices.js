const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProjectTask } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");

const insertNewProjectTask = async (data) => {
  const value = validateProjectTask(data);
  const result = await dbConfig.query(
    "INSERT INTO project_task(id,description,name,project_id,task_status_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [
      value.id,
      value.description,
      value.name,
      value.project_id,
      value.task_status_id,
    ]
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
  const condition = parseInt(id);
  checkUpdateData(data);
  const result = await dbConfig.query(
    "UPDATE project_task SET description=$1,name=$2,task_status_id=$3 WHERE id = $4 RETURNING * ",
    [data.description, data.name, data.task_status_id, condition]
  );

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
