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
  checkRole("ADMIN"),
  userController.selectAllUsers
);
router.get("/:id", verifyAccessToken, userController.selectUser);

router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  userController.updateUser
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  userController.deleteOneUser
);
module.exports = router;
