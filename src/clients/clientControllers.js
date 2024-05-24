const { successResponse, failResponse } = require("../../utils/apiResponse");
const clientService = require("./clientServices");

const createClient = async (req, res) => {
  try {
    const client = await clientService.insertNewClient(req.body);
    successResponse(res, client);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.selectOneClient(id);
    successResponse(res, client);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectClients = async (req, res) => {
  try {
    const clients = await clientService.selectAllClients();
    successResponse(res, clients);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientService.updateOneClient(req.body, id);
    successResponse(res, client);
  } catch (error) {
    failResponse(res, error);
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await clientService.deleteOneClient(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

module.exports = {
  createClient,
  selectClient,
  selectClients,
  updateClient,
  deleteClient,
};
