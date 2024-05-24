const router = require("express").Router();
const projectstatusController = require("./projectstatusControllers");
const {
  verifyAccessToken,
  isAdmin,
  checkUserRole,
} = require("../../middlewares/verifyToken");

router.post(
  "/add",
  verifyAccessToken,
  projectstatusController.createProjectStatus
);
router.get(
  "/all",
  verifyAccessToken,
  projectstatusController.selectAllProjectStatus
);
router.get(
  "/:id",
  verifyAccessToken,
  projectstatusController.selectProjectStatus
);
router.put(
  "/update/:id",
  verifyAccessToken,
  projectstatusController.updateProjectStatus
);
router.delete(
  "/:id",
  verifyAccessToken,
  projectstatusController.deleteProjectStatus
);
module.exports = router;
