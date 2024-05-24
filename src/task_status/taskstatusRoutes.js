const router = require("express").Router();
const taskStatusController = require("./taskstatusControllers");
const { verifyAccessToken } = require("../../middlewares/verifyToken");
router.post("/add-taskstatus", taskStatusController.createTaskStatus);
router.get("/all-taskstatus", taskStatusController.selectAllTaskStatus);
router.get("/:id", taskStatusController.selectTaskStatus);
router.put("/update/:id", taskStatusController.updateTaskStatus);
router.delete("/:id", taskStatusController.deleteTaskStatus);
module.exports = router;
