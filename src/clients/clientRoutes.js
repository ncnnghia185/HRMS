const router = require("express").Router();
const clientController = require("./clientControllers");
const { verifyAccessToken, isAdmin } = require("../../middlewares/verifyToken");
router.post("/add", verifyAccessToken, isAdmin, clientController.createClient);
router.get("/all", clientController.selectClients);
router.get("/:id", clientController.selectClient);
router.put("/update/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);
module.exports = router;
