const { verifyAccessToken, isAdmin } = require("../../middlewares/verifyToken");
const router = require("express").Router();
const projectemployeeController = require("./projectemployeeControllers");

router.post(
  "/add/:id",
  verifyAccessToken,
  projectemployeeController.createProjectEmployee
);

router.get("/all", projectemployeeController.selectProjectEmployees);
router.get("/count", projectemployeeController.countProjectEmployeeJoined);
router.get(
  "/count-employees",
  projectemployeeController.countEmployeesJoinProject
);
router.get("/:id", projectemployeeController.selectEmployeeProjects);

router.put(
  "/update/:id",
  verifyAccessToken,
  isAdmin,
  projectemployeeController.updateProjectEmployee
);
router.delete(
  "/:id",
  verifyAccessToken,
  isAdmin,
  projectemployeeController.deleteProjectEmployee
);
module.exports = router;
