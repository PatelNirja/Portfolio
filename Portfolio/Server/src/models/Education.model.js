const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: [true, "Institution is required"], trim: true },
    degree: { type: String, required: [true, "Degree is required"], trim: true },
    fieldOfStudy: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    grade: { type: String, trim: true },
    description: { type: String },
    institutionLogo: { type: String, default: "" },
    institutionLogoPublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
