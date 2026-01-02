// utility.jsx
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Create a simple axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // important: send cookies automatically
});

// Optional: simple response interceptor to log errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error.response?.data || error.message);

    // If 401 Unauthorized, you can redirect to login
    if (error.response?.status === 401) {
      // Optionally clear user context here if you use one
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;