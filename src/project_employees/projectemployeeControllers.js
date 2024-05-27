const { successResponse, failResponse } = require("../../utils/apiResponse");
const projectemployeeService = require("./projectemployeeServices");

const createProjectEmployee = async (req, res) => {
  try {
    const id = req.user.id;

    const ProjectEmployee = await projectemployeeService.insertProjectEmployee(
      id,
      req.body
    );
    successResponse(res, ProjectEmployee);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectEmployeeProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const ProjectEmployee =
      await projectemployeeService.selectOneProjectEmployee(id);
    successResponse(res, ProjectEmployee);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectProjectEmployees = async (req, res) => {
  try {
    const ProjectEmployees =
      await projectemployeeService.selectAllProjectEmployee();
    successResponse(res, ProjectEmployees);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateProjectEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const ProjectEmployee = await projectemployeeService.updateProjectEmployee(
      req.body,
      id
    );
    successResponse(res, ProjectEmployee);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteProjectEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await projectemployeeService.deleteProjectEmployee(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

const countProjectEmployeeJoined = async (req, res) => {
  try {
    const data = await projectemployeeService.countProjectEmployeeJoined();
    successResponse(res, data);
  } catch (error) {
    failResponse(res, error);
  }
};

const countEmployeesJoinProject = async (req, res) => {
  try {
    const data = await projectemployeeService.countEmployeesJoinProject();
    successResponse(res, data);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  createProjectEmployee,
  selectEmployeeProjects,
  selectProjectEmployees,
  updateProjectEmployee,
  deleteProjectEmployee,
  countProjectEmployeeJoined,
  countEmployeesJoinProject,
};
