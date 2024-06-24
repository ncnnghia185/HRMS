const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
const router = require("express").Router();
const projectemployeeController = require("./projectemployeeControllers");

router.post(
  "/add-employee",
  verifyAccessToken,

  projectemployeeController.createProjectEmployee
);

router.get(
  "/all",
  verifyAccessToken,
  projectemployeeController.selectProjectEmployees
);

router.get(
  "/:id",
  verifyAccessToken,
  projectemployeeController.selectEmployeeProjects
);

router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectemployeeController.updateProjectEmployee
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  projectemployeeController.deleteProjectEmployee
);
module.exports = router;
