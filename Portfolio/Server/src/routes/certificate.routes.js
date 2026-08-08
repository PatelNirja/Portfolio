const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", certificateController.listCertificates);
router.post("/", authMiddleware, certificateController.addCertificate);
router.put("/:id", authMiddleware, certificateController.editCertificate);
router.delete("/:id", authMiddleware, certificateController.removeCertificate);

module.exports = router;
