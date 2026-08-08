const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createSkillSchema, updateSkillSchema } = require("../validators/skill.validator");

router.get("/", skillController.listSkills);
router.post("/", authMiddleware, validate(createSkillSchema), skillController.addSkill);
router.put("/:id", authMiddleware, validate(updateSkillSchema), skillController.editSkill);
router.delete("/:id", authMiddleware, skillController.removeSkill);

module.exports = router;
