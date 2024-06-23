const userService = require("./userService");
const { successResponse, failResponse } = require("../../utils/apiResponse");
const { cloudinary } = require("../../config/cloudinaryConfig");
const createNewUser = async (req, res) => {
  const {
    name,
    address,
    birthday,
    email,
    phone,
    role_id,
    password,
    department_id,
  } = req.body;
  const avatarPath = req.file.path;
  try {
    const uploadResult = await cloudinary.uploader.upload(avatarPath, {
      folder: "employees_avatar",
    });
    const avatarUrl = uploadResult.secure_url;
    const employeeData = {
      name,
      address,
      birthday,
      email,
      phone,
      role_id,
      password,
      department_id,
      avatar: avatarUrl,
    };
    const newUser = await userService.insertUser(employeeData);
    successResponse(res, newUser);
  } catch (error) {
    failResponse(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const data = await userService.login(req.body, res);
    successResponse(res, data);
  } catch (error) {
    failResponse(res, error);
  }
};
const selectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.selectOneUser(id);
    successResponse(res, user);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.selectAllUser();
    successResponse(res, allUsers);
  } catch (error) {
    failResponse(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(req.body, id);
    successResponse(res, user);
  } catch (error) {
    failResponse(res, error);
  }
};
const deleteOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_password } = req.body;
    await userService.userChangePassword(new_password, id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

const selectDepartment = async (req, res) => {
  try {
    const { department } = req.body;
    const { id } = req.user;
    await userService.userSelectDepartment(department, id);
    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};

const logoutUser = async (req, res) => {
  const cookie = req.cookies;
  try {
    // Clear refresh token in cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    successResponse(res);
  } catch (error) {
    failResponse(res, error);
  }
};
module.exports = {
  selectUser,
  createNewUser,
  selectAllUsers,
  deleteOneUser,
  loginUser,
  changePassword,
  selectDepartment,
  logoutUser,
  updateUser,
};
