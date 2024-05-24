const router = require("express").Router();
const departmenrController = require("./departmentControllers");
const { verifyAccessToken } = require("../../middlewares/verifyToken");
router.get("/all", departmenrController.selectAllDepartments);
router.get("/:id", departmenrController.selectDepartment);
router.post("/add-department", departmenrController.createDepartment);
router.put("/update/:id", departmenrController.updateDepartment);
router.delete("/:id", departmenrController.deleteDepartment);
module.exports = router;
