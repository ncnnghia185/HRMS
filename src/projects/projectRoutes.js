const router = require("express").Router();
const projectController = require("./projectControllers");
const { verifyAccessToken, isAdmin } = require("../../middlewares/verifyToken");

router.post(
  "/add",
  verifyAccessToken,
  isAdmin,
  projectController.createProject
);
router.get(
  "/all",
  verifyAccessToken,
  isAdmin,
  projectController.selectProjects
);
router.get("/:id", verifyAccessToken, projectController.selectProject);
router.put(
  "/update/:id",
  verifyAccessToken,
  isAdmin,
  projectController.updateProject
);
router.delete("/:id", projectController.deleteProject);
module.exports = router;
