const { successResponse, failResponse } = require("../../utils/apiResponse");
const projectRolesServices = require("./projectRoleServices");

// get one role
const getOneProjectRole = async (req, res) => {
  try {
    const { prId } = req.params;
    const role = await projectRolesServices.selectOneProjectRole(prId);
    successResponse(res, role);
  } catch (error) {
    failResponse(res, error);
  }
};

// get all roles
const getAllProjectRoles = async (req, res) => {
  try {
    const allRoles = await projectRolesServices.selectAllProjectRoles();
    successResponse(res, allRoles);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  getOneProjectRole,
  getAllProjectRoles,
};
