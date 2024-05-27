const router = require("express").Router();
const employeeController = require("./employeeControllers");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
router.post(
  "/add",
  verifyAccessToken,
  checkRole("ADMIN"),
  employeeController.createEmployee
);
router.get(
  "/all",
  verifyAccessToken,
  checkRole("ADMIN"),
  employeeController.selectEmployees
);
router.get("/:id", verifyAccessToken, employeeController.selectEmployee);
router.put("/update/:id", verifyAccessToken, employeeController.updateEmployee);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  employeeController.deleteEmployee
);
module.exports = router;
