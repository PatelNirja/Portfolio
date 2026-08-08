import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send HTTP-only cookies on requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for global error extraction
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "An unexpected error occurred.";
    const errors = error.response?.data?.errors || [];
    return Promise.reject({ message, errors, status: error.response?.status });
  }
);

export default axiosInstance;
