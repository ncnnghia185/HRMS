const router = require("express").Router();
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
const rolesControllers = require("./rolesControllers");

router.get(
  "/all-roles",
  verifyAccessToken,
  checkRole("ADMIN"),
  rolesControllers.getAllRoles
);
router.get(
  "/:rId",
  verifyAccessToken,
  checkRole("ADMIN"),
  rolesControllers.getOneRole
);

module.exports = router;
