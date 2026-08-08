const express = require("express");
const router = express.Router();
const achievementController = require("../controllers/achievement.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", achievementController.listAchievements);
router.post("/", authMiddleware, achievementController.addAchievement);
router.put("/:id", authMiddleware, achievementController.editAchievement);
router.delete("/:id", authMiddleware, achievementController.removeAchievement);

module.exports = router;
