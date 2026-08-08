const { uploadBufferToCloudinary, deleteFromCloudinary } = require("../utils/cloudinaryUtils");

/**
 * Uploads an image buffer to Cloudinary under the 'portfolio/images' folder.
 * @param {Buffer} buffer - File buffer from Multer.
 * @returns {{ url: string, publicId: string }}
 */
const uploadImage = async (buffer) => {
  const result = await uploadBufferToCloudinary(buffer, {
    folder: "portfolio/images",
    resource_type: "image",
    quality: "auto",
    fetch_format: "auto",
  });
  return { url: result.secure_url, publicId: result.public_id };
};

/**
 * Uploads a PDF resume to Cloudinary under 'portfolio/resume'.
 * @param {Buffer} buffer - PDF file buffer.
 * @returns {{ url: string, publicId: string }}
 */
const uploadResume = async (buffer) => {
  const result = await uploadBufferToCloudinary(buffer, {
    folder: "portfolio/resume",
    resource_type: "raw",
    format: "pdf",
  });
  return { url: result.secure_url, publicId: result.public_id };
};

/**
 * Deletes a file from Cloudinary by publicId.
 */
const deleteFile = async (publicId, resourceType = "image") => {
  return await deleteFromCloudinary(publicId, resourceType);
};

module.exports = { uploadImage, uploadResume, deleteFile };
