const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Certificate name is required"], trim: true },
    issuer: { type: String, required: [true, "Issuer is required"], trim: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    credentialId: { type: String, trim: true },
    credentialUrl: { type: String, default: "" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
