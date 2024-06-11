const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
const router = require("express").Router();
const projecttaskController = require("./projecttaskController");
router.post(
  "/add-task",
  verifyAccessToken,
  checkRole("ADMIN"),
  projecttaskController.createProjectTask
);
router.get(
  "/all-tasks",
  verifyAccessToken,
  projecttaskController.getProjectTasks
);
router.get("/:id", verifyAccessToken, projecttaskController.getProjectTask);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projecttaskController.updateProjectTask
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projecttaskController.deleteProjectTask
);

module.exports = router;
