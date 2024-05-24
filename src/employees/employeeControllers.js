const { successResponse, failResponse } = require("../../utils/apiResponse");
const employeeService = require("./employeeServices");

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.insertNewEmployee(req.body);
    successResponse(res, employee);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.selectOneEmployee(id);
    successResponse(res, employee);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectEmployees = async (req, res) => {
  try {
    const employees = await employeeService.selectAllEmployees();
    successResponse(res, employees);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.updateOneEmployee(req.body, id);
    successResponse(res, employee);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await employeeService.deleteOneEmployee(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

module.exports = {
  createEmployee,
  selectEmployee,
  selectEmployees,
  updateEmployee,
  deleteEmployee,
};
