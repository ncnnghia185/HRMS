const router = require("express").Router();
const projectstatusController = require("./projectstatusControllers");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");

router.post(
  "/add-status",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectstatusController.createProjectStatus
);
router.get(
  "/all-status",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectstatusController.selectAllProjectStatus
);
router.get(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectstatusController.selectProjectStatus
);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectstatusController.updateProjectStatus
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectstatusController.deleteProjectStatus
);
module.exports = router;
