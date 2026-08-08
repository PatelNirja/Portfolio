const Certificate = require("../models/Certificate.model");
const ApiError = require("../utils/ApiError");

const getCertificates = async () => {
  return await Certificate.find().sort({ order: 1, issueDate: -1 });
};

const createCertificate = async (data) => {
  return await Certificate.create(data);
};

const updateCertificate = async (id, data) => {
  const certificate = await Certificate.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!certificate) throw new ApiError(404, "Certificate not found.");
  return certificate;
};

const deleteCertificate = async (id) => {
  const certificate = await Certificate.findByIdAndDelete(id);
  if (!certificate) throw new ApiError(404, "Certificate not found.");
  return certificate;
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
