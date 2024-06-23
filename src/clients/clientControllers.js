const { successResponse, failResponse } = require("../../utils/apiResponse");
const clientService = require("./clientServices");
const { cloudinary } = require("../../config/cloudinaryConfig");
const createClient = async (req, res) => {
  const { company, email, name, phone, position, projects } = req.body;
  const avatarPath = req.file.path;
  try {
    const uploadResult = await cloudinary.uploader.upload(avatarPath, {
      folder: "clients_avatar",
    });
    const avatarUrl = uploadResult.secure_url;
    const clientData = {
      company,
      email,
      name,
      phone,
      position,
      projects,
      avatar: avatarUrl,
    };
    const client = await clientService.insertNewClient(clientData);
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
