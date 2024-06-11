const { dbConfig } = require("../../config/dbConnect");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProject } = require("../../utils/validateInput");
const { updateQuery } = require("../../utils/handleQuery");
const insertNewProject = async (data) => {
  const value = validateProject(data);
  const project = await dbConfig.query(
    "INSERT INTO projects(id,client_id,description,thumbnail,title) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [value.id, value.client_id, value.description, value.thumbnail, value.title]
  );
  return project.rows[0];
};

const selectOneProject = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(
    `SELECT p.*, pp.name 
     FROM projects p 
     LEFT JOIN project_priority pp 
     ON p.priority_id = pp.id 
     WHERE p.id = $1`,
    [condition]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllProjects = async () => {
  const result = await dbConfig.query(
    "SELECT p.*, pp.name FROM projects p LEFT JOIN project_priority pp ON p.priority_id = pp.id ORDER BY pp.id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const updateOneProject = async (data, id) => {
  checkUpdateData(data);

  const baseQuery = `UPDATE projects SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);

  return result.rows[0];
};

const deleteOneProject = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM projects WHERE id = $1", [condition]);
};

module.exports = {
  insertNewProject,
  selectOneProject,
  selectAllProjects,
  updateOneProject,
  deleteOneProject,
};
