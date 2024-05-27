const router = require("express").Router();
const clientController = require("./clientControllers");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
router.post(
  "/add",
  verifyAccessToken,
  checkRole("ADMIN"),
  clientController.createClient
);
router.get(
  "/all",
  verifyAccessToken,
  checkRole("ADMIN"),
  clientController.selectClients
);
router.get("/:id", verifyAccessToken, clientController.selectClient);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  clientController.updateClient
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  clientController.deleteClient
);
module.exports = router;
