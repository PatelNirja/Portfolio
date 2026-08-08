import axiosInstance from "./axiosInstance";

export const authApi = {
  login: (credentials) => axiosInstance.post("/auth/login", credentials),
  logout: () => axiosInstance.post("/auth/logout"),
  getMe: () => axiosInstance.get("/auth/me"),
};
