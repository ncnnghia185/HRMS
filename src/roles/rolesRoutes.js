const router = require("express").Router();
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
const rolesControllers = require("./rolesControllers");

router.get(
  "/all-roles",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  rolesControllers.getAllRoles
);
router.get(
  "/:rId",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  rolesControllers.getOneRole
);

module.exports = router;
