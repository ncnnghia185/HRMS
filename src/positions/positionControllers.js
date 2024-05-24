const { failResponse, successResponse } = require("../../utils/apiResponse");
const positionServices = require("./positionServices");

const createPosition = async (req, res) => {
  try {
    const result = await positionServices.insertPosition(req.body);
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};

const getPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await positionServices.selectOnePosition(id);
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};

const getPositions = async (req, res) => {
  try {
    const result = await positionServices.selectAllPositions();
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};

const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await positionServices.updateOnePosition(data, id);
    successResponse(res, result);
  } catch (error) {
    failResponse(res, error);
  }
};
const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await positionServices.deleteOnePosition(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  createPosition,
  getPosition,
  getPositions,
  updatePosition,
  deletePosition,
};
