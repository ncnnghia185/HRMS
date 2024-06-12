const { dbConfig } = require("../../config/dbConnect");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProjectStatus } = require("../../utils/validateInput");
const { updateQuery } = require("../../utils/handleQuery");

const insertProjectStatus = async (data) => {
  const value = validateProjectStatus(data);
  const res = await dbConfig.query(
    "INSERT INTO project_status(id,name) VALUES ($1,$2) RETURNING *",
    [value.id, value.name]
  );

  return res.rows[0];
};
const selectOneProjectStatus = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(
    "SELECT * FROM project_status WHERE id = $1",
    [condition]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};
const selectAllProjectStatus = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM project_status ORDER BY id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};
const updateProjectStatus = async (id, data) => {
  checkUpdateData(data);

  const baseQuery = `UPDATE project_status SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);

  return result.rows[0];
};
const deleteProjectStatus = async (id) => {
  await selectOneProjectStatus(id);
  await dbConfig.query("DELETE FROM project_status WHERE id = $1", [id]);
};
module.exports = {
  insertProjectStatus,
  selectOneProjectStatus,
  selectAllProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
};
