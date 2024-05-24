const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateTaskStatus } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");

const insertTaskStatus = async (data) => {
  const value = validateTaskStatus(data);
  await dbConfig.query(
    "INSERT INTO task_status(id,name) VALUES ($1,LOWER($2))",
    [value.id, value.name]
  );
  return await selectOneTaskStatus(value.id);
};

const selectOneTaskStatus = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(
    "SELECT * FROM task_status WHERE id = $1",
    [condition]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllTaskStatus = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM task_status ORDER BY id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const updataOneTaskStatus = async (data, id) => {
  checkUpdateData(data);
  const value = Object.values(data).toString();
  const condition = parseInt(id);
  await dbConfig.query("UPDATE task_status SET name = $1 WHERE id = $2", [
    value,
    condition,
  ]);
  return await selectOneTaskStatus(condition);
};

const deleteOneTaskStatus = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM task_status WHERE id = $1", [condition]);
};

module.exports = {
  insertTaskStatus,
  selectOneTaskStatus,
  selectAllTaskStatus,
  updataOneTaskStatus,
  deleteOneTaskStatus,
};
