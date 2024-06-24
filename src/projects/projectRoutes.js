const router = require("express").Router();
const projectController = require("./projectControllers");
const { upload } = require("../../config/cloudinaryConfig");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");

router.post(
  "/add-project",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  upload.single("thumbnail"),
  projectController.createProject
);

router.get(
  "/all-projects",
  verifyAccessToken,
  projectController.selectProjects
);

router.get("/:id", verifyAccessToken, projectController.selectProject);

router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectController.updateProject
);

router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectController.deleteProject
);
module.exports = router;
