import axiosInstance from "./axiosInstance";

export const educationApi = {
  getEducations: () => axiosInstance.get("/education"),
  createEducation: (data) => axiosInstance.post("/education", data),
  updateEducation: (id, data) => axiosInstance.put(`/education/${id}`, data),
  deleteEducation: (id) => axiosInstance.delete(`/education/${id}`),
};
