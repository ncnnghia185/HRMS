const { successResponse, failResponse } = require("../../utils/apiResponse");
const rolesServices = require("./rolesServices");

// get one role
const getOneRole = async (req, res) => {
  try {
    const { rId } = req.params;
    const role = await rolesServices.selectOneRole(rId);
    successResponse(res, role);
  } catch (error) {
    failResponse(res, error);
  }
};

// get all roles
const getAllRoles = async (req, res) => {
  try {
    const allRoles = await rolesServices.selectAllRoles();
    successResponse(res, allRoles);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  getOneRole,
  getAllRoles,
};
