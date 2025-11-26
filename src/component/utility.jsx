// utility.jsx
import axios from "axios";

const API_BASE_URL = "https://backend-logic-ohjo.vercel.app/"; // Change if your backend URL is different

// Create a simple axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("Sending request to:", config.url, "with headers:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: simple response interceptor to log errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response?.data || error.message);
    // If 401, you can logout user
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;