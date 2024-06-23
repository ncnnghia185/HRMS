const router = require("express").Router();
const employeetaskController = require("./employeetaskControllers");
const { upload } = require("../../config/cloudinaryConfig");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");

router.post(
  "/add-user",
  verifyAccessToken,
  checkRole("ADMIN"),
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
router.put(
  "/update/:tId",
  verifyAccessToken,
  employeetaskController.updateEmployeeTask
);
router.delete(
  "/:tId",
  verifyAccessToken,
  checkRole("ADMIN"),
  employeetaskController.deleteEmployeeTask
);
module.exports = router;
