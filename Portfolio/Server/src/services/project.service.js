const Project = require("../models/Project.model");
const ApiError = require("../utils/ApiError");
const slugify = require("../utils/slugify");

/**
 * Retrieves all published projects with optional filtering, search, and pagination.
 */
const getProjects = async ({ page = 1, limit = 10, category, search, status, all = false }) => {
  const query = {};

  // Public users only see published projects unless all=true (admin)
  if (!all) query.status = "published";
  if (category && category !== "all") query.category = category;

  if (search) {
    query.$text = { $search: search };
  }

  const skip = (page - 1) * limit;
  const total = await Project.countDocuments(query);

  const projects = await Project.find(query)
    .sort(search ? { score: { $meta: "textScore" } } : { order: 1, createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    projects,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Retrieves a single project by its slug (public) or ID (admin).
 */
const getProjectBySlug = async (slug) => {
  const project = await Project.findOne({ slug, status: "published" });
  if (!project) throw new ApiError(404, "Project not found.");
  return project;
};

const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found.");
  return project;
};

/**
 * Creates a new project. Ensures unique slug by appending timestamp if needed.
 */
const createProject = async (data) => {
  let slug = slugify(data.title);
  const existing = await Project.findOne({ slug });
  if (existing) slug = `${slug}-${Date.now()}`;
  return await Project.create({ ...data, slug });
};

const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, "Project not found.");
  return project;
};

const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new ApiError(404, "Project not found.");
  return project;
};

/**
 * Bulk reorder projects.
 * @param {Array<{id: string, order: number}>} items
 */
const reorderProjects = async (items) => {
  const ops = items.map(({ id, order }) => ({
    updateOne: { filter: { _id: id }, update: { $set: { order } } },
  }));
  await Project.bulkWrite(ops);
};

module.exports = { getProjects, getProjectBySlug, getProjectById, createProject, updateProject, deleteProject, reorderProjects };
