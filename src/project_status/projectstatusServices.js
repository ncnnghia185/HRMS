const { dbConfig } = require("../../config/dbConnect");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProjectStatus } = require("../../utils/validateInput");

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

  const condition = parseInt(id);
  const res = await dbConfig.query(
    "UPDATE project_status SET name = $1 WHERE id = $2 RETURNING *",
    [data.name, condition]
  );

  return res.rows[0];
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
