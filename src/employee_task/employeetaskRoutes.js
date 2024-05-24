const router = require("express").Router();
const employeetaskController = require("./employeetaskControllers");
const { verifyAccessToken } = require("../../middlewares/verifyToken");

router.post("/add", employeetaskController.createEmployeeTask);
router.get("/all", employeetaskController.selectAllEmployeeTask);
router.get("/:tId", employeetaskController.selectEmployeeTask);
router.put("/update/:tId", employeetaskController.updateEmployeeTask);
router.delete("/:tId", employeetaskController.deleteEmployeeTask);
module.exports = router;
