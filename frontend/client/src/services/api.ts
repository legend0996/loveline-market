import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔐 Attach correct token automatically
API.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  // 👉 Admin routes (admin + poster)
  if (
    config.url?.startsWith("/api/admin") ||
    config.url?.startsWith("/api/poster")
  ) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    // 👉 Normal user routes
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return config;
});

export default API;