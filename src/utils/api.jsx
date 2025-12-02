import axios from "axios";

const baseURL = "http://localhost:3001/api";

export const api = axios.create({
  baseURL,
  headers:{
      "Content-Type": "application/json"
  }
  //   headers:{
  //     "Content-Type": "multipart/form-data"
  // }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth state
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");

      // Only redirect if not already on a login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/user/login";
      }
    }
    return Promise.reject(error);
  }
);
