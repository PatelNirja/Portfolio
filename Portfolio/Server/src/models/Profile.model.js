const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    tagline: { type: String, trim: true },
    bio: { type: String },
    profileImage: { type: String, default: "" },
    profileImagePublicId: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    resumePublicId: { type: String, default: "" },
    location: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    isAvailable: { type: Boolean, default: true },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
