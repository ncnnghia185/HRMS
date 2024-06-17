const router = require("express").Router();
const projectController = require("./projectControllers");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");

router.post(
  "/add-project",
  verifyAccessToken,
  checkRole("ADMIN"),
  upload.single("thumbnail"),
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
