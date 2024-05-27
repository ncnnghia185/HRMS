const router = require("express").Router();
const positionController = require("./positionControllers");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
router.post(
  "/add-position",
  verifyAccessToken,
  checkRole("ADMIN"),
  positionController.createPosition
);
router.get(
  "/all",
  verifyAccessToken,
  checkRole("ADMIN"),
  positionController.getPositions
);
router.get("/:id", verifyAccessToken, positionController.getPosition);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  positionController.updatePosition
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  positionController.deletePosition
);
module.exports = router;
