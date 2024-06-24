const { failResponse, successResponse } = require("../../utils/apiResponse");
const projecttaskServices = require("./projecttaskServices");

const createProjectTask = async (req, res) => {
  const role_id = req.user.role_id;
  const user_id = req.user.id;
  try {
    const result = await projecttaskServices.insertNewProjectTask(
      req.body,
      role_id,
      user_id
    );
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};

const getProjectTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await projecttaskServices.selectOneProjectTask(id);
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const result = await projecttaskServices.selectAllProjectTasks();
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};

const getAllProjectTasksOfUser = async (req, res) => {
  const role_id = req.user.role_id;
  const uId = req.user.id;
  try {
    const uId = req.user.id;
    const result = await projecttaskServices.selectProjectTaskOfUser(
      uId,
      role_id
    );
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};
const updateProjectTask = async (req, res) => {
  const role_id = req.user.role_id;
  const user_id = req.user.id;
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await projecttaskServices.updateOneProjectTask(
      data,
      id,
      role_id,
      user_id
    );
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};
const deleteProjectTask = async (req, res) => {
  try {
    const { id } = req.params;
    await projecttaskServices.deleteOneProjectTask(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  createProjectTask,
  getProjectTask,
  getProjectTasks,
  getAllProjectTasksOfUser,
  updateProjectTask,
  deleteProjectTask,
};
