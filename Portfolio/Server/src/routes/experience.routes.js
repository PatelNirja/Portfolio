const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", experienceController.listExperiences);
router.post("/", authMiddleware, experienceController.addExperience);
router.put("/:id", authMiddleware, experienceController.editExperience);
router.delete("/:id", authMiddleware, experienceController.removeExperience);

module.exports = router;
