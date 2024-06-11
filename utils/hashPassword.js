const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (newPassword, oldPassword) => {
  const isMatch = await bcrypt.compare(newPassword, oldPassword);
  if (isMatch) {
    throw new Error("New password must differ from old password");
  }
  return true;
};
module.exports = {
  hashPassword,
  comparePassword,
};
