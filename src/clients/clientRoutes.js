const router = require("express").Router();
const clientController = require("./clientControllers");
const { upload } = require("../../config/cloudinaryConfig");
const {
  verifyAccessToken,
  checkRole,
} = require("../../middlewares/verifyToken");
router.post(
  "/add-client",
  verifyAccessToken,
  checkRole("ADMIN"),
  upload.single("avatar"),
  clientController.createClient
);
router.get(
  "/all-clients",
  verifyAccessToken,
  checkRole("ADMIN"),
  clientController.selectClients
);
router.get(
  "/:id",
  verifyAccessToken,
  checkRole("ADMIN"),
  clientController.selectClient
);
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
