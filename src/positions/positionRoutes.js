const router = require("express").Router();
const positionController = require("./positionControllers");
const { verifyAccessToken } = require("../../middlewares/verifyToken");
router.post("/add-position", positionController.createPosition);
router.get("/all", positionController.getPositions);
router.get("/:id", positionController.getPosition);
router.put("/update/:id", positionController.updatePosition);
router.delete("/:id", positionController.deletePosition);
module.exports = router;
