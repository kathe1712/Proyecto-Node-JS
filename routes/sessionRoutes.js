const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/sessionController");
const verifyToken = require("../middleware/verifyToken");

//Ruta protegida para obtener información
router.get("/currentUser", verifyToken, sessionController.getCurrentUser);

module.exports = router;