const { verifyAccessToken } = require("../../middlewares/verifyToken");
const router = require("express").Router();
const projecttaskController = require("./projecttaskController");
router.post("/add", projecttaskController.createProjectTask);
router.get("/all", projecttaskController.getProjectTasks);
router.get("/:id", projecttaskController.getProjectTask);
router.put("/update/:id", projecttaskController.updateProjectTask);
router.delete("/:id", projecttaskController.deleteProjectTask);

module.exports = router;
