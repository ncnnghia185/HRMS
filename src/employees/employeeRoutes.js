const router = require("express").Router();
const employeeController = require("./employeeControllers");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
const { upload } = require("../../config/cloudinaryConfig");
router.post(
  "/add",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  upload.single("avatar"),
  employeeController.createEmployee
);
router.get(
  "/all",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  employeeController.selectEmployees
);
router.get("/:id", verifyAccessToken, employeeController.selectEmployee);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  employeeController.updateEmployee
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  employeeController.deleteEmployee
);
module.exports = router;
