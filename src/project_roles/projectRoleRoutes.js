const router = require("express").Router();
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
const projectRoleController = require("./projectRoleControllers");

router.get(
  "/all-roles",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectRoleController.getAllProjectRoles
);
router.get(
  "/:prId",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectRoleController.getOneProjectRole
);

module.exports = router;
