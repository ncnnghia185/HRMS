const { successResponse, failResponse } = require("../../utils/apiResponse");
const taskstatusService = require("./taskstatusServices");

const createTaskStatus = async (req, res) => {
  try {
    const taskstatus = await taskstatusService.insertTaskStatus(req.body);
    successResponse(res, taskstatus);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await taskstatusService.selectOneTaskStatus(id);
    successResponse(res, status);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectAllTaskStatus = async (req, res) => {
  try {
    const allStatus = await taskstatusService.selectAllTaskStatus();
    successResponse(res, allStatus);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = await taskstatusService.updataOneTaskStatus(
      req.body,
      id
    );
    successResponse(res, updatedStatus);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await taskstatusService.deleteOneTaskStatus(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

module.exports = {
  createTaskStatus,
  selectTaskStatus,
  selectAllTaskStatus,
  updateTaskStatus,
  deleteTaskStatus,
};
