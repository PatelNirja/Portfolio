import axiosInstance from "./axiosInstance";

export const skillsApi = {
  getSkills: () => axiosInstance.get("/skills"),
  createSkill: (data) => axiosInstance.post("/skills", data),
  updateSkill: (id, data) => axiosInstance.put(`/skills/${id}`, data),
  deleteSkill: (id) => axiosInstance.delete(`/skills/${id}`),
};
