const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { uploadImage, uploadPdf } = require("../middleware/upload.middleware");

router.post("/image", authMiddleware, uploadImage.single("image"), uploadController.uploadImageFile);
router.post("/resume", authMiddleware, uploadPdf.single("resume"), uploadController.uploadResumeFile);
router.delete("/file", authMiddleware, uploadController.deleteFileByPublicId);

module.exports = router;
