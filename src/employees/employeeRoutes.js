const router = require("express").Router();
const employeeController = require("./employeeControllers");
const { verifyAccessToken } = require("../../middlewares/verifyToken");
router.post("/add", employeeController.createEmployee);
router.get("/all", employeeController.selectEmployees);
router.get("/:id", employeeController.selectEmployee);
router.put("/update/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
module.exports = router;
