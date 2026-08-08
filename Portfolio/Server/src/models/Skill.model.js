const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Skill name is required"], trim: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "devops", "database", "tools", "other"],
      default: "other",
    },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    icon: { type: String, default: "" }, // SVG string, icon name, or URL
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
