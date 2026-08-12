const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "Untitled Project" },
    slug: { type: String, unique: true, lowercase: true },
    shortDesc: { type: String, trim: true },
    description: { type: String },
    thumbnail: { type: String, default: "" },
    thumbnailPublicId: { type: String, default: "" },
    images: [{ type: String }],
    imagePublicIds: [{ type: String }],
    tags: [{ type: String, trim: true }],
    category: {
      type: String,
      enum: ["web", "mobile", "ai", "other"],
      default: "web",
    },
    techStack: [{ type: String, trim: true }],
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title before saving
projectSchema.pre("save", function () {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title || `project-${Date.now()}`);
  }
});

// Text index for search functionality
projectSchema.index({ title: "text", shortDesc: "text", tags: "text" });

module.exports = mongoose.model("Project", projectSchema);
