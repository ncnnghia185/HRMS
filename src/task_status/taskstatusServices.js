const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateTaskStatus } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");

const insertTaskStatus = async (data) => {
  const value = validateTaskStatus(data);
  const result = await dbConfig.query(
    "INSERT INTO task_status(id,name) VALUES ($1,LOWER($2)) RETURNING *",
    [value.id, value.name]
  );
  return result.rows[0];
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

  const baseQuery = `UPDATE task_status SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
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
