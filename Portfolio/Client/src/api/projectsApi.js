import axiosInstance from "./axiosInstance";

export const projectsApi = {
  getProjects: (params) => axiosInstance.get("/projects", { params }),
  getProjectBySlug: (slug) => axiosInstance.get(`/projects/${slug}`),
  getProjectByIdAdmin: (id) => axiosInstance.get(`/projects/admin/${id}`),
  createProject: (data) => axiosInstance.post("/projects", data),
  updateProject: (id, data) => axiosInstance.put(`/projects/${id}`, data),
  deleteProject: (id) => axiosInstance.delete(`/projects/${id}`),
  reorderProjects: (items) => axiosInstance.patch("/projects/reorder", { items }),
};
