const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    location: { type: String, trim: true },
    description: { type: String },
    technologies: [{ type: String, trim: true }],
    companyLogo: { type: String, default: "" },
    companyLogoPublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
