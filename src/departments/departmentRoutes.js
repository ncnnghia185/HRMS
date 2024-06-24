const router = require("express").Router();
const departmenrController = require("./departmentControllers");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
router.get(
  "/all-departments",
  verifyAccessToken,
  departmenrController.selectAllDepartments
);
router.get("/:id", verifyAccessToken, departmenrController.selectDepartment);
router.post(
  "/add-department",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  departmenrController.createDepartment
);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  departmenrController.updateDepartment
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  departmenrController.deleteDepartment
);
module.exports = router;
