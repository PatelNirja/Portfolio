import axiosInstance from "./axiosInstance";

export const experienceApi = {
  getExperiences: () => axiosInstance.get("/experience"),
  createExperience: (data) => axiosInstance.post("/experience", data),
  updateExperience: (id, data) => axiosInstance.put(`/experience/${id}`, data),
  deleteExperience: (id) => axiosInstance.delete(`/experience/${id}`),
};
