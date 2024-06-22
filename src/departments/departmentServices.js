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
    "INSERT INTO departments(name) VALUES (LOWER($1)) RETURNING *",
    [value.name]
  );
  return result.rows[0];
};

const selectOneDepartment = async (id) => {
  const result = await dbConfig.query(
    "SELECT * FROM departments WHERE id = $1",
    [id]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllDepartment = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM departments ORDER BY id ASC"
  );
  return result.rows;
};

const updateOneDepartment = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE departments SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
};

const deleteOneDepartment = async (id) => {
  await dbConfig.query("DELETE FROM departments WHERE id = $1", [id]);
};

module.exports = {
  insertDepartment,
  selectOneDepartment,
  selectAllDepartment,
  updateOneDepartment,
  deleteOneDepartment,
};
