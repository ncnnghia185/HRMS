const router = require("express").Router();
const departmenrController = require("./departmentControllers");
const {
  verifyAccessToken,
  checkRole,
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
  checkRole("ADMIN"),
  departmenrController.createDepartment
);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  departmenrController.updateDepartment
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  departmenrController.deleteDepartment
);
module.exports = router;
