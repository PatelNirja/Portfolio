const multer = require("multer");
const ApiError = require("../utils/ApiError");

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_PDF_TYPES = ["application/pdf"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_SIZE = 10 * 1024 * 1024;  // 10 MB

const storage = multer.memoryStorage(); // Store in memory → stream to Cloudinary

/**
 * Image upload middleware — allows JPEG, PNG, WebP, GIF up to 5MB.
 */
const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only JPEG, PNG, WebP, and GIF images are allowed."));
    }
  },
});

/**
 * PDF upload middleware — allows only PDF files up to 10MB.
 */
const uploadPdf = multer({
  storage,
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_PDF_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only PDF files are allowed."));
    }
  },
});

module.exports = { uploadImage, uploadPdf };
