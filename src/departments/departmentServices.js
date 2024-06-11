const { dbConfig } = require("../../config/dbConnect");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateDepartment } = require("../../utils/validateInput");
const { updateQuery } = require("../../utils/handleQuery");

const insertDepartment = async (data) => {
  const value = validateDepartment(data);
  const result = await dbConfig.query(
    "INSERT INTO departments(id,name) VALUES ($1,LOWER($2)) RETURNING *",
    [value.id, value.name]
  );
  return result.rows[0];
};

const selectOneDepartment = async (name) => {
  const result = await dbConfig.query(
    "SELECT * FROM departments WHERE name = $1",
    [name]
  );
  checkExistResult(result);
  return result.rows[0];
};

const selectAllDepartment = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM departments ORDER BY id ASC"
  );
  return result.rows;
};

const updateOneDepartment = async (data, name) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE projects SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
};

const deleteOneDepartment = async (name) => {
  await dbConfig.query("DELETE FROM departments WHERE name = $1", [name]);
};

module.exports = {
  insertDepartment,
  selectOneDepartment,
  selectAllDepartment,
  updateOneDepartment,
  deleteOneDepartment,
};
