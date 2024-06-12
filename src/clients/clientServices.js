const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateClient } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");

const insertNewClient = async (data) => {
  const value = validateClient(data);
  const result = await dbConfig.query(
    "INSERT INTO clients(id,company,email,name,phone,position,projects) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [
      value.id,
      value.company,
      value.email,
      value.name,
      value.phone,
      value.position,
      value.projects,
    ]
  );
  return result.rows[0];
};

const selectOneClient = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query("SELECT * FROM clients WHERE id = $1", [
    condition,
  ]);
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllClients = async () => {
  const result = await dbConfig.query("SELECT * FROM clients ORDER BY id ASC");
  checkExistResult(result.rows);
  return result.rows;
};

const updateOneClient = async (data, id) => {
  checkUpdateData(data);
  const baseQuery = `UPDATE clients SET `;
  const sqlQuery = updateQuery(baseQuery, id, data);
  const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);

  return result.rows[0];
};
const deleteOneClient = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM clients WHERE id = $1", [condition]);
};

module.exports = {
  insertNewClient,
  selectOneClient,
  selectAllClients,
  updateOneClient,
  deleteOneClient,
};
