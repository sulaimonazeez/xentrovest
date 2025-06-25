import axios from 'axios';

const API_BASE_URL = 'https://xentrovest.pythonanywhere.com/api';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    if (csrfToken && config.method !== 'get') { // Don't send for GET requests
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/token/refresh/') {
      originalRequest._retry = true; // Mark as a retry attempt

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axiosInstance.post('/token/refresh/');
          const newAccessToken = response.data.access_token;
          const expiresAt = response.data.expires_in
          localStorage.setItem('access_token', newAccessToken); // Update access token
          localStorage.setItem("expires_in", expiresAt.toString());
          isRefreshing = false;
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          isRefreshing = false;
          processQueue(refreshError, null);

          localStorage.removeItem('access_token');
          window.location.href = '/login'; // Example redirection
          return Promise.reject(refreshError); // Propagate the refresh error
        }
      } else {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;