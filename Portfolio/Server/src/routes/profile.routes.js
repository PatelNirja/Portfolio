const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", profileController.fetchProfile);
router.put("/", authMiddleware, profileController.editProfile);

module.exports = router;
