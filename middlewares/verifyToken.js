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

const ROLES = {
  ADMIN: 1,
  PM: 2,
  MEMBER: 3,
};
const checkRole = (roleKey) => {
  return (req, res, next) => {
    const role = ROLES[roleKey];
    if (req.user.role_id !== role) {
      return res.status(403).json({
        success: false,
        message: "Access denied : Insufficient permissions",
      });
    }

    next();
  };
};
module.exports = {
  verifyAccessToken,
  checkRole,
  ROLES,
};
