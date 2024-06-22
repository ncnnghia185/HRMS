const { validatePosition } = require("../../utils/validateInput");
const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");
const insertPosition = async (data) => {
  const value = validatePosition(data);
  const result = await dbConfig.query(
    "INSERT INTO positions(name) VALUES (LOWER($1)) RETURNING *",
    [value.name]
  );
  return result.rows[0];
};

const selectOnePosition = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query("SELECT * FROM positions WHERE id = $1", [
    condition,
  ]);
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllPositions = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM positions ORDER BY id ASC"
  );
  return result.rows;
};

const updateOnePosition = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE positions SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
  return result.rows[0];
};
const deleteOnePosition = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM positions WHERE id = $1", [condition]);
};

module.exports = {
  insertPosition,
  selectOnePosition,
  selectAllPositions,
  updateOnePosition,
  deleteOnePosition,
};
