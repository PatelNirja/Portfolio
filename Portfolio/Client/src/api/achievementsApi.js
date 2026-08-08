import axiosInstance from "./axiosInstance";

export const achievementsApi = {
  getAchievements: () => axiosInstance.get("/achievements"),
  createAchievement: (data) => axiosInstance.post("/achievements", data),
  updateAchievement: (id, data) => axiosInstance.put(`/achievements/${id}`, data),
  deleteAchievement: (id) => axiosInstance.delete(`/achievements/${id}`),
};
