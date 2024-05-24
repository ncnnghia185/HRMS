const { successResponse, failResponse } = require("../../utils/apiResponse");
const projectService = require("./projectServices");

const createProject = async (req, res) => {
  try {
    const project = await projectService.insertNewProject(req.body);
    successResponse(res, project);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.selectOneProject(id);
    successResponse(res, project);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectProjects = async (req, res) => {
  try {
    const allProjects = await projectService.selectAllProjects();
    successResponse(res, allProjects);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await projectService.updateOneProject(req.body, id);
    successResponse(res, updated);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await projectService.deleteOneProject(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

module.exports = {
  createProject,
  selectProject,
  selectProjects,
  updateProject,
  deleteProject,
};
