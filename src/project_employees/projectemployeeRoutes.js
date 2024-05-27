const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
const router = require("express").Router();
const projectemployeeController = require("./projectemployeeControllers");

router.post(
  "/add",
  verifyAccessToken,

  projectemployeeController.createProjectEmployee
);

router.get(
  "/all",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectemployeeController.selectProjectEmployees
);
router.get(
  "/count",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectemployeeController.countProjectEmployeeJoined
);
router.get(
  "/count-employees",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectemployeeController.countEmployeesJoinProject
);
router.get(
  "/:id",
  verifyAccessToken,
  projectemployeeController.selectEmployeeProjects
);

router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectemployeeController.updateProjectEmployee
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectemployeeController.deleteProjectEmployee
);
module.exports = router;
