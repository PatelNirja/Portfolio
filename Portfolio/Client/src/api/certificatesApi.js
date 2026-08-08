import axiosInstance from "./axiosInstance";

export const certificatesApi = {
  getCertificates: () => axiosInstance.get("/certificates"),
  createCertificate: (data) => axiosInstance.post("/certificates", data),
  updateCertificate: (id, data) => axiosInstance.put(`/certificates/${id}`, data),
  deleteCertificate: (id) => axiosInstance.delete(`/certificates/${id}`),
};
