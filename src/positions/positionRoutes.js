const router = require("express").Router();
const positionController = require("./positionControllers");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
router.post(
  "/add-position",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  positionController.createPosition
);
router.get(
  "/all-positions",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  positionController.getPositions
);
router.get("/:id", verifyAccessToken, positionController.getPosition);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  positionController.updatePosition
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  positionController.deletePosition
);
module.exports = router;
