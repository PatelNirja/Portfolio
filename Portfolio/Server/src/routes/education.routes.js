const express = require("express");
const router = express.Router();
const educationController = require("../controllers/education.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", educationController.listEducations);
router.post("/", authMiddleware, educationController.addEducation);
router.put("/:id", authMiddleware, educationController.editEducation);
router.delete("/:id", authMiddleware, educationController.removeEducation);

module.exports = router;
