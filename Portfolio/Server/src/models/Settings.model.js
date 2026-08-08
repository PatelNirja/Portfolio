const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "My Portfolio" },
    siteDescription: { type: String, default: "A professional portfolio showcasing my work." },
    ogImage: { type: String, default: "" },
    ogImagePublicId: { type: String, default: "" },
    keywords: [{ type: String }],
    googleAnalyticsId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
