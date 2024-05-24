const departmentServices = require("./departmentServices");
const { successResponse, failResponse } = require("../../utils/apiResponse");

const createDepartment = async (req, res) => {
  try {
    const newDepartment = await departmentServices.insertDepartment(req.body);
    successResponse(res, newDepartment);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentServices.selectOneDepartment(id);
    successResponse(res, department);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectAllDepartments = async (req, res) => {
  try {
    const allDepartments = await departmentServices.selectAllDepartment();
    successResponse(res, allDepartments);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await departmentServices.updateOneDepartment(req.body, id);
    successResponse(res, updated);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await departmentServices.deleteOneDepartment(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  createDepartment,
  selectDepartment,
  selectAllDepartments,
  updateDepartment,
  deleteDepartment,
};
