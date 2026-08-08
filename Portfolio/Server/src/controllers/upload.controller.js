const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const uploadService = require("../services/upload.service");

const uploadImageFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload an image file.");
  }
  const fileData = await uploadService.uploadImage(req.file.buffer);
  res.status(200).json(new ApiResponse(200, fileData, "Image uploaded successfully"));
});

const uploadResumeFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload a PDF resume file.");
  }
  const fileData = await uploadService.uploadResume(req.file.buffer);
  res.status(200).json(new ApiResponse(200, fileData, "Resume uploaded successfully"));
});

const deleteFileByPublicId = asyncHandler(async (req, res) => {
  const { publicId, resourceType } = req.body;
  if (!publicId) {
    throw new ApiError(400, "Public ID is required for deletion.");
  }
  await uploadService.deleteFile(publicId, resourceType || "image");
  res.status(200).json(new ApiResponse(200, null, "File deleted from Cloudinary"));
});

module.exports = { uploadImageFile, uploadResumeFile, deleteFileByPublicId };
