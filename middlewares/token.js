const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, roleId) => {
  return jwt.sign({ id: userId, role_id: roleId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
