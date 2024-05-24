const router = require("express").Router();
const userController = require("./userController");
const { verifyAccessToken, isAdmin } = require("../../middlewares/verifyToken");
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/add-user", userController.createNewUser);
router.post("/change-password/:id", userController.changePassword);
router.post(
  "/select-department",
  verifyAccessToken,
  userController.selectDepartment
);
router.get("/all-users", userController.selectAllUsers);
router.get("/:id", userController.selectUser);
router.delete("/:id", userController.deleteOneUser);
module.exports = router;
