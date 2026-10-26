import axios from "axios";
import { localAdapter } from "./localApi";

// Frontend-only mode: every /api/* call is answered by the in-browser
// database (see localApi.js). When a real backend is ready, set
// VITE_BACKEND_URL and the local adapter is skipped automatically.
const BASE = import.meta.env.VITE_BACKEND_URL || "";

export const api = axios.create({
  baseURL: BASE,
  timeout: 30000,
  ...(BASE ? {} : { adapter: localAdapter }),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

export const apiError = (err, fallback = "অজানা ত্রুটি") =>
  err?.response?.data?.error || err?.message || fallback;

export default api;
