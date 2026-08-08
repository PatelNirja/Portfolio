const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { messageSchema } = require("../validators/message.validator");
const { contactLimiter } = require("../middleware/rateLimit.middleware");

router.post("/", contactLimiter, validate(messageSchema), messageController.submitMessage);
router.get("/", authMiddleware, messageController.listMessages);
router.patch("/:id/read", authMiddleware, messageController.markRead);
router.delete("/:id", authMiddleware, messageController.removeMessage);

module.exports = router;
