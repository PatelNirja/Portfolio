const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const certificateService = require("../services/certificate.service");

const listCertificates = asyncHandler(async (req, res) => {
  const certificates = await certificateService.getCertificates();
  res.status(200).json(new ApiResponse(200, { certificates }, "Certificates retrieved successfully"));
});

const addCertificate = asyncHandler(async (req, res) => {
  const certificate = await certificateService.createCertificate(req.body);
  res.status(201).json(new ApiResponse(201, { certificate }, "Certificate created successfully"));
});

const editCertificate = asyncHandler(async (req, res) => {
  const certificate = await certificateService.updateCertificate(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { certificate }, "Certificate updated successfully"));
});

const removeCertificate = asyncHandler(async (req, res) => {
  await certificateService.deleteCertificate(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Certificate deleted successfully"));
});

module.exports = { listCertificates, addCertificate, editCertificate, removeCertificate };
