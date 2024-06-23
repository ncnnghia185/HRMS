const { successResponse, failResponse } = require("../../utils/apiResponse");
const projectService = require("./projectServices");
const { cloudinary } = require("../../config/cloudinaryConfig");
const createProject = async (req, res) => {
  const { client_id, description, title } = req.body;
  const thumbnailPath = req.file.path;
  try {
    const uploadResult = await cloudinary.uploader.upload(thumbnailPath, {
      folder: "project_thumbnail",
    });
    const thumbnailUrl = uploadResult.secure_url;
    const newProjectData = {
      client_id,
      description,
      thumbnail: thumbnailUrl,
      title,
    };
    const project = await projectService.insertNewProject(newProjectData);
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
