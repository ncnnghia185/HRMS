const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateClient } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");

const insertNewClient = async (data) => {
  const value = validateClient(data);
  await dbConfig.query(
    "INSERT INTO clients(id,company,email,name,phone,position,projects) VALUES($1,$2,$3,$4,$5,$6,$7)",
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
  return await selectOneClient(value.id);
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
  const condition = parseInt(id);
  checkUpdateData(data);
  await dbConfig.query(
    "UPDATE clients SET  company=$1,email=$2,name=$3,phone=$4,position=$5,projects=$6 WHERE id = $7 ",
    [
      data.company,
      data.email,
      data.name,
      data.phone,
      data.position,
      data.projects,
      condition,
    ]
  );

  return await selectOneClient(condition);
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
