const { dbConfig } = require("../../config/dbConnect");
const { checkExistResult } = require("../../utils/handleQuery");

// Select one role
const selectOneProjectRole = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(
    `SELECT * FROM project_role WHERE id = $1`,
    [condition]
  );
  checkExistResult(result.rows);

  return result.rows[0];
};

// Select all roles
const selectAllProjectRoles = async () => {
  const result = await dbConfig.query(
    `SELECT * FROM project_role ORDER BY id ASC`
  );
  return result.rows;
};
module.exports = {
  selectOneProjectRole,
  selectAllProjectRoles,
};
