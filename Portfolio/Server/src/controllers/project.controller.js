const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const projectService = require("../services/project.service");

const listProjects = asyncHandler(async (req, res) => {
  const { page, limit, category, search, status } = req.query;
  const isAdmin = req.user !== undefined;
  const result = await projectService.getProjects({ page, limit, category, search, status, all: isAdmin });
  res.status(200).json(new ApiResponse(200, { projects: result.projects }, "Projects retrieved", result.pagination));
});

const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectBySlug(req.params.slug);
  res.status(200).json(new ApiResponse(200, { project }, "Project retrieved"));
});

const getProjectAdmin = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  res.status(200).json(new ApiResponse(200, { project }, "Project retrieved"));
});

const addProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(201).json(new ApiResponse(201, { project }, "Project created successfully"));
});

const editProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { project }, "Project updated successfully"));
});

const removeProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
});

const reorder = asyncHandler(async (req, res) => {
  await projectService.reorderProjects(req.body.items);
  res.status(200).json(new ApiResponse(200, null, "Projects reordered successfully"));
});

module.exports = { listProjects, getProject, getProjectAdmin, addProject, editProject, removeProject, reorder };