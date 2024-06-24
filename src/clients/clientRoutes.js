const router = require("express").Router();
const clientController = require("./clientControllers");
const { upload } = require("../../config/cloudinaryConfig");
const {
  verifyAccessToken,
  checkRole,
  ROLES,
} = require("../../middlewares/verifyToken");
router.post(
  "/add-client",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  upload.single("avatar"),
  clientController.createClient
);
router.get(
  "/all-clients",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  clientController.selectClients
);
router.get(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  clientController.selectClient
);
router.put(
  "/update/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  clientController.updateClient
);
router.delete(
  "/:id",
  verifyAccessToken,
  checkRole(ROLES.ADMIN),
  clientController.deleteClient
);
module.exports = router;
