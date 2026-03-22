import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) console.error("Unathorize");
    return Promise.reject(err);
  }
);

export default axiosInstance;
