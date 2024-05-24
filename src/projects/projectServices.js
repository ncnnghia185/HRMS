const { dbConfig } = require("../../config/dbConnect");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProject } = require("../../utils/validateInput");

const insertNewProject = async (data) => {
  const value = validateProject(data);
  await dbConfig.query(
    "INSERT INTO projects(id,client_id,description,thumbnail,title) VALUES($1,$2,$3,$4,$5)",
    [value.id, value.client_id, value.description, value.thumbnail, value.title]
  );
  return await selectOneProject(value.id);
};

const selectOneProject = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query("SELECT * FROM projects WHERE id = $1", [
    condition,
  ]);
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
  const condition = parseInt(id);
  checkUpdateData(data);

  let query = "UPDATE projects SET ";
  let values = [];
  let index = 1;

  for (const key in data) {
    if (data[key] !== null || data[key] !== undefined || data[key] !== "") {
      if (index > 1) {
        query += `,${key} = $${index}`;
      } else {
        query += `${key} = $${index}`;
      }
      values.push(data[key]);
      index++;
    }
  }
  query += ` WHERE id = $${index}`;
  values.push(condition);
  await dbConfig.query(query, values);

  return await selectOneProject(condition);
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
