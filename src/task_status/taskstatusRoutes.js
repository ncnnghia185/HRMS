const router = require("express").Router();
const taskStatusController = require("./taskstatusControllers");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
router.post(
  "/add-taskstatus",
  verifyAccessToken,
  checkRole("ADMIN"),
  taskStatusController.createTaskStatus
);
router.get(
  "/all-taskstatus",
  verifyAccessToken,
  checkRole("ADMIN"),
  taskStatusController.selectAllTaskStatus
);
router.get("/:id", verifyAccessToken, taskStatusController.selectTaskStatus);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  taskStatusController.updateTaskStatus
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  taskStatusController.deleteTaskStatus
);
module.exports = router;
