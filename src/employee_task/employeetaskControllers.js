const { successResponse, failResponse } = require("../../utils/apiResponse");
const employeetaskService = require("./employeetaskServices");

const createEmployeeTask = async (req, res) => {
  try {
    const data = await employeetaskService.insertEmployeeTask(req.body);
    successResponse(res, data);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectEmployeeTask = async (req, res) => {
  try {
    const { tId } = req.params;
    const data = await employeetaskService.selectOneTaskEmployee(tId);
    successResponse(res, data);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectAllEmployeeTask = async (req, res) => {
  try {
    const allEmployeeTask = await employeetaskService.selectAllEmployeeTask();
    successResponse(res, allEmployeeTask);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectAllTaskOfUser = async (req, res) => {
  try {
    const { uId } = req.params;
    const result = await employeetaskService.selectTasksOfEmployee(uId);
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};
const updateEmployeeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await employeetaskService.updateEmployeeTask(req.body, id);
    successResponse(res, data);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteEmployeeTask = async (req, res) => {
  try {
    const { tId, uId } = req.params;

    await employeetaskService.deleteEmployeeTask(tId, uId);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  createEmployeeTask,
  selectEmployeeTask,
  selectAllEmployeeTask,
  selectAllTaskOfUser,
  updateEmployeeTask,
  deleteEmployeeTask,
};
