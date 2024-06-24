const router = require("express").Router();
const employeetaskController = require("./employeetaskControllers");
const { upload } = require("../../config/cloudinaryConfig");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");

router.post(
  "/add-user",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  upload.single("avatar"),
  employeetaskController.createEmployeeTask
);
router.get(
  "/all",
  verifyAccessToken,
  employeetaskController.selectAllEmployeeTask
);
router.get(
  "/:tId",
  verifyAccessToken,
  employeetaskController.selectEmployeeTask
);
router.get(
  "/user-tasks/:uId",
  verifyAccessToken,
  employeetaskController.selectAllTaskOfUser
);
router.put(
  "/update/:tId",
  verifyAccessToken,
  employeetaskController.updateEmployeeTask
);
router.delete(
  "/:tId",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  employeetaskController.deleteEmployeeTask
);
module.exports = router;
