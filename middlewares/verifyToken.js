const jwt = require("jsonwebtoken");
const { dbConfig } = require("../config/dbConnect");
// Authentication
const verifyAccessToken = async (req, res, next) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
          return res.status(401).json({
            success: false,
            mes: "Invalid Token",
          });
        }
        req.user = decode;
        next();
      });
    } else {
      return res.status(401).json({
        success: false,
        mes: "Required Authentication",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mes: "Server Error",
      error: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const command = `SELECT r.name AS role_name FROM users AS u INNER JOIN roles AS r ON u.role_id = r.id WHERE u.role_id = $1 `;
    const value = [req.user?.role_id];
    const result = await dbConfig.query(command, value);

    if (result.rows[0]?.role_name.toLowerCase() !== "admin") {
      return res.status(403).json({
        success: false,
        message: "REQUIRED ADMIN ROLE",
      });
    }
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

const isPM = async (req, res, next) => {
  try {
    const command = `SELECT r.name AS role_name FROM users AS u INNER JOIN roles AS r ON u.role_id = r.id WHERE u.role_id = $1 `;
    const value = [req.user?.role_id];
    const result = await dbConfig.query(command, value);

    if (result.rows[0]?.role_name.toLowerCase() !== "pm") {
      return res.status(403).json({
        success: false,
        message: "REQUIRED PM ROLE",
      });
    }
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

const isMember = async (req, res, next) => {
  try {
    const command = `SELECT r.name AS role_name FROM users AS u INNER JOIN roles AS r ON u.role_id = r.id WHERE u.role_id = $1 `;
    const value = [req.user?.role_id];
    const result = await dbConfig.query(command, value);

    if (result.rows[0]?.role_name.toLowerCase() !== "member") {
      return res.status(403).json({
        success: false,
        message: "REQUIRED MEMBER ROLE",
      });
    }
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  verifyAccessToken,
  isAdmin,
  isPM,
  isMember,
};
