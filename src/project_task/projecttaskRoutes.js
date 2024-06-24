const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
const router = require("express").Router();
const projecttaskController = require("./projecttaskController");
router.post(
  "/add-task",
  verifyAccessToken,
  checkRole(ROLES.ADMIN, ROLES.PM),
  projecttaskController.createProjectTask
);

router.get(
  "/tasks",
  verifyAccessToken,
  projecttaskController.getAllProjectTasksOfUser
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
  checkRole(ROLES.ADMIN, ROLES.PM, ROLES.MEMBER),
  projecttaskController.updateProjectTask
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projecttaskController.deleteProjectTask
);

module.exports = router;
