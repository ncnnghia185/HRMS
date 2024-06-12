const { dbConfig } = require("../../config/dbConnect");
const { checkExistResult } = require("../../utils/handleQuery");

// Select one role
const selectOneRole = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(`SELECT * FROM roles WHERE id = $1`, [
    condition,
  ]);
  checkExistResult(result.rows);

  return result.rows[0];
};

// Select all roles
const selectAllRoles = async () => {
  const result = await dbConfig.query(`SELECT * FROM roles ORDER BY id ASC`);
  return result.rows;
};
module.exports = {
  selectOneRole,
  selectAllRoles,
};
