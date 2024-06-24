const router = require("express").Router();
const userController = require("./userController");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
const { upload } = require("../../config/cloudinaryConfig");
router.post("/login", userController.loginUser);

router.get("/logout", userController.logoutUser);

router.post(
  "/add-user",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  upload.single("avatar"),
  userController.createNewUser
);
router.put(
  "/change-password/:id",
  verifyAccessToken,
  userController.changePassword
);

router.put(
  "/select-department",
  verifyAccessToken,
  userController.selectDepartment
);
router.get(
  "/all-users",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  userController.selectAllUsers
);
router.get("/:id", verifyAccessToken, userController.selectUser);

router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  userController.updateUser
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  userController.deleteOneUser
);
module.exports = router;
