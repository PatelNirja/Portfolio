const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const profileRoutes = require("./profile.routes");
const projectRoutes = require("./project.routes");
const skillRoutes = require("./skill.routes");
const experienceRoutes = require("./experience.routes");
const educationRoutes = require("./education.routes");
const achievementRoutes = require("./achievement.routes");
const certificateRoutes = require("./certificate.routes");
const messageRoutes = require("./message.routes");
const uploadRoutes = require("./upload.routes");
const settingsRoutes = require("./settings.routes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/experience", experienceRoutes);
router.use("/education", educationRoutes);
router.use("/achievements", achievementRoutes);
router.use("/certificates", certificateRoutes);
router.use("/messages", messageRoutes);
router.use("/upload", uploadRoutes);
router.use("/settings", settingsRoutes);

module.exports = router;
