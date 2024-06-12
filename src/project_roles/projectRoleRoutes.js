const router = require("express").Router();
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
const projectRoleController = require("./projectRoleControllers");

router.get(
  "/all-roles",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectRoleController.getAllProjectRoles
);
router.get(
  "/:prId",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectRoleController.getOneProjectRole
);

module.exports = router;
