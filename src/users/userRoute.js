const router = require("express").Router();
const userController = require("./userController");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post(
  "/add-user",
  verifyAccessToken,
  checkRole("ADMIN"),
  userController.createNewUser
);
router.post("/change-password/:id", userController.changePassword);
router.post(
  "/select-department",
  verifyAccessToken,
  userController.selectDepartment
);
router.get(
  "/all-users",
  verifyAccessToken,
  checkRole(),
  userController.selectAllUsers
);
router.get("/:id", verifyAccessToken, userController.selectUser);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  userController.deleteOneUser
);
module.exports = router;
