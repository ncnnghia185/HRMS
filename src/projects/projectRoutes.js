const router = require("express").Router();
const projectController = require("./projectControllers");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");

router.post(
  "/add-project",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectController.createProject
);

router.get(
  "/all-projects",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectController.selectProjects
);

router.get("/:id", verifyAccessToken, projectController.selectProject);

router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectController.updateProject
);

router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectController.deleteProject
);
module.exports = router;
