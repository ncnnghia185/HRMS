const projectstatusService = require("./projectstatusServices");
const { successResponse, failResponse } = require("../../utils/apiResponse");

const createProjectStatus = async (req, res) => {
  try {
    const projectStatus = await projectstatusService.insertProjectStatus(
      req.body
    );
    successResponse(res, projectStatus);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await projectstatusService.selectOneProjectStatus(id);
    successResponse(res, status);
  } catch (error) {
    failResponse(res, error);
  }
};
const selectAllProjectStatus = async (req, res) => {
  try {
    const allStatus = await projectstatusService.selectAllProjectStatus();
    successResponse(res, allStatus);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = await projectstatusService.updateProjectStatus(
      id,
      req.body
    );
    successResponse(res, updatedStatus);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await projectstatusService.deleteProjectStatus(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  createProjectStatus,
  selectProjectStatus,
  selectAllProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
};
