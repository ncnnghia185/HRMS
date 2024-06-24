const {
  checkExistResult,
  checkUpdateData,
} = require("../../utils/handleQuery");
const { validateProjectTask } = require("../../utils/validateInput");
const { dbConfig } = require("../../config/dbConnect");
const { updateQuery } = require("../../utils/handleQuery");

const insertNewProjectTask = async (data, roleId, userId) => {
  const value = validateProjectTask(data);

  if (roleId === 1) {
    const result = await dbConfig.query(
      "INSERT INTO project_task(description,name,project_id,task_status_id,user_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [
        value.description,
        value.name,
        value.project_id,
        value.task_status_id,
        value.user_id,
      ]
    );
    return result.rows[0];
  }

  if (roleId === 2) {
    const condition = parseInt(value.user_id);

    const project_id = await dbConfig.query(
      `SELECT DISTINCT project_id FROM project_task WHERE user_id = $1`,
      [userId]
    );
    if (project_id.rows.length === 0) {
      throw new Error("You have not been added to any projects yet");
    }
    const role_of_employee = await dbConfig.query(
      `SELECT role_id FROM employees WHERE id = $1`,
      [condition]
    );

    const PmProjectsId = project_id.rows.map((item) => item.project_id);
    if (value.project_id && !PmProjectsId.includes(value.project_id)) {
      throw new Error(
        "You do not have permission to add members to projects you have not joined"
      );
    }

    if (
      roleId === role_of_employee.rows[0].role_id ||
      role_of_employee.rows[0].role_id === 1
    ) {
      throw new Error(
        "You do not have permission to add ADMIN or another PM to this project"
      );
    }
    const result = await dbConfig.query(
      `INSERT INTO project_task (description, name, project_id, task_status_id, user_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        value.description,
        value.name,
        value.project_id,
        value.task_status_id,
        value.user_id,
      ]
    );
    return result.rows[0];
  }
};

const selectOneProjectTask = async (id) => {
  const condition = parseInt(id);
  const result = await dbConfig.query(
    "SELECT * FROM project_task WHERE id = $1",
    [condition]
  );
  checkExistResult(result.rows);
  return result.rows[0];
};

const selectAllProjectTasks = async () => {
  const result = await dbConfig.query(
    "SELECT * FROM project_task ORDER BY id ASC"
  );
  checkExistResult(result.rows);
  return result.rows;
};

const selectProjectTaskOfUser = async (userId) => {
  const result = await dbConfig.query(
    `SELECT * FROM project_task WHERE user_id = $1`,
    [userId]
  );

  return result.rows;
};

const updateOneProjectTask = async (data, id, roleId, userId) => {
  checkUpdateData(data);
  if (roleId === 1) {
    const baseQuery = `UPDATE project_task SET `;
    const sqlQuery = updateQuery(baseQuery, id, data);
    const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);

    return result.rows[0];
  }

  const prj_id_by_id = await dbConfig.query(
    `SELECT project_id FROM project_task WHERE id = id`
  );

  const project_id_by_user = await dbConfig.query(
    `SELECT DISTINCT project_id FROM project_task WHERE user_id = $1`,
    [userId]
  );

  if (project_id_by_user.length === 0) {
    throw new Error("You have not been added to any projects yet");
  }

  const PmProjectsId = project_id_by_user.rows.map((item) => item.project_id);

  if (roleId === 2) {
    if (
      (data.project_id && !PmProjectsId.includes(data.project_id)) ||
      !PmProjectsId.includes(prj_id_by_id.rows[0].project_id)
    ) {
      throw new Error("You not have permission to add member to this project");
    }
    const baseQuery = `UPDATE project_task SET `;
    const sqlQuery = updateQuery(baseQuery, id, data);
    const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);

    return result.rows[0];
  }

  if (roleId === 3) {
    if (
      (data.project_id && !PmProjectsId.includes(data.project_id)) ||
      !PmProjectsId.includes(prj_id_by_id.rows[0].project_id)
    ) {
      throw new Error("You not have permission to add member to this project");
    }
    if (
      Object.keys(data).length !== 1 ||
      !data.hasOwnProperty("task_status_id")
    ) {
      throw new Error(
        "You do not have permission to update fields other than task_status_id"
      );
    }
    const baseQuery = `UPDATE project_task SET `;
    const sqlQuery = updateQuery(baseQuery, id, data);
    const result = await dbConfig.query(sqlQuery.query, sqlQuery.values);
    return result.rows[0];
  }
};
const deleteOneProjectTask = async (id) => {
  const condition = parseInt(id);
  await dbConfig.query("DELETE FROM project_task WHERE id = $1", [condition]);
};

module.exports = {
  insertNewProjectTask,
  selectOneProjectTask,
  selectAllProjectTasks,
  selectProjectTaskOfUser,
  updateOneProjectTask,
  deleteOneProjectTask,
};
