const router = require("express").Router();
const projectstatusController = require("./projectstatusControllers");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");

router.post(
  "/add",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectstatusController.createProjectStatus
);
router.get(
  "/all",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectstatusController.selectAllProjectStatus
);
router.get(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectstatusController.selectProjectStatus
);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectstatusController.updateProjectStatus
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  projectstatusController.deleteProjectStatus
);
module.exports = router;
