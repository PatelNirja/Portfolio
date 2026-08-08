import axiosInstance from "./axiosInstance";

export const messagesApi = {
  submitMessage: (data) => axiosInstance.post("/messages", data),
  getMessages: (params) => axiosInstance.get("/messages", { params }),
  markRead: (id) => axiosInstance.patch(`/messages/${id}/read`),
  deleteMessage: (id) => axiosInstance.delete(`/messages/${id}`),
};
