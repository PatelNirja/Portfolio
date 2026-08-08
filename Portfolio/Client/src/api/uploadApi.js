import axiosInstance from "./axiosInstance";

export const uploadApi = {
  uploadImage: (formData) =>
    axiosInstance.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  uploadResume: (formData) =>
    axiosInstance.post("/upload/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteFile: (publicId, resourceType = "image") =>
    axiosInstance.delete("/upload/file", { data: { publicId, resourceType } }),
};
