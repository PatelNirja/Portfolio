import axiosInstance from "./axiosInstance";

export const settingsApi = {
  getSettings: () => axiosInstance.get("/settings"),
  updateSettings: (data) => axiosInstance.put("/settings", data),
};
