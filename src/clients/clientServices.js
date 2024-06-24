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
    "INSERT INTO clients(company,email,name,phone,position,projects,avatar) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [
      value.company,
      value.email,
      value.name,
      value.phone,
      value.position,
      value.projects,
      value.avatar ||
        "https://res.cloudinary.com/dn1etgdhn/image/upload/v1719134981/default_avatar_fixrns.jpg",
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
  const projects_of_client = result.rows[0].projects.split(",");
  const data = {
    company: result.rows[0].company,
    email: result.rows[0].email,
    id: result.rows[0].id,
    name: result.rows[0].name,
    phone: result.rows[0].phone,
    position: result.rows[0].position,
    projects: projects_of_client,
    avatar: result.rows[0].avatar,
  };
  return data;
};

const selectAllClients = async () => {
  const result = await dbConfig.query("SELECT * FROM clients ORDER BY id ASC");
  checkExistResult(result.rows);
  const data = result.rows.map((item) => {
    return {
      ...item,
      projects: item.projects.split(","),
    };
  });

  return data;
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
