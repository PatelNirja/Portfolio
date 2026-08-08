const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", settingsController.fetchSettings);
router.put("/", authMiddleware, settingsController.editSettings);

module.exports = router;
