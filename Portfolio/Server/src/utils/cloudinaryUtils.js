const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/**
 * Uploads a file buffer to Cloudinary via a readable stream.
 * @param {Buffer} buffer - File buffer from Multer memory storage.
 * @param {Object} options - Cloudinary upload options (folder, resource_type, etc.).
 * @returns {Promise<Object>} Cloudinary upload result { secure_url, public_id }.
 */
const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * Deletes a resource from Cloudinary by its public_id.
 * @param {string} publicId - The Cloudinary public_id of the resource.
 * @param {string} resourceType - 'image' | 'raw' | 'video'. Defaults to 'image'.
 */
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = { uploadBufferToCloudinary, deleteFromCloudinary };
