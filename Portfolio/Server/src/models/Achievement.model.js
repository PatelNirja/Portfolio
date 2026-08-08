const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Achievement title is required"], trim: true },
    description: { type: String },
    date: { type: Date },
    icon: { type: String, default: "" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
