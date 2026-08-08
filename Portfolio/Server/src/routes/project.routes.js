const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { createProjectSchema, updateProjectSchema } = require("../validators/project.validator");

router.get("/", projectController.listProjects);
router.get("/:slug", projectController.getProject);
router.get("/admin/:id", authMiddleware, projectController.getProjectAdmin);
router.post("/", authMiddleware, validate(createProjectSchema), projectController.addProject);
router.put("/:id", authMiddleware, validate(updateProjectSchema), projectController.editProject);
router.delete("/:id", authMiddleware, projectController.removeProject);
router.patch("/reorder", authMiddleware, projectController.reorder);

module.exports = router;