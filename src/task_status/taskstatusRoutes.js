const router = require("express").Router();
const taskStatusController = require("./taskstatusControllers");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
router.post(
  "/add-taskstatus",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  taskStatusController.createTaskStatus
);
router.get(
  "/all-taskstatus",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  taskStatusController.selectAllTaskStatus
);
router.get("/:id", verifyAccessToken, taskStatusController.selectTaskStatus);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  taskStatusController.updateTaskStatus
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  taskStatusController.deleteTaskStatus
);
module.exports = router;
