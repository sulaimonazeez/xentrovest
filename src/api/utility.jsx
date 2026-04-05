import axios from "axios";
import { triggerLogout } from "../context/AuthEvents";

const API_BASE_URL = process.env.REACT_APP_API_URL;

let memoryToken = null;

export const setAuthToken = (token) => {
  memoryToken = token;
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  if (memoryToken) return memoryToken;
  const stored = localStorage.getItem("token");
  if (stored) {
    memoryToken = stored;
    return stored;
  }
  return null;
};

export const clearAuthToken = () => {
  memoryToken = null;
  localStorage.removeItem("token");
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      const isAuthRoute = ["/check", "/login", "/logout"].some(r => url.includes(r));
      if (!isAuthRoute) {
        console.warn("Session expired — logging out");
        clearAuthToken();
        triggerLogout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;