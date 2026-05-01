import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  if (
    config.url?.startsWith("/api/admin") ||
    config.url?.startsWith("/api/poster")
  ) {
    if (adminToken) config.headers.Authorization = `Bearer ${adminToken}`;
  } else {
    if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const url = err.config?.url ?? "";
      if (url.startsWith("/api/admin") || url.startsWith("/api/poster")) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/profile/login";
      }
    }
    return Promise.reject(err);
  }
);

export default API;
