import axios from "axios";
import { authStore } from "../stores/authstore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

// add token before each request
api.interceptors.request.use((config) => {
  const { token } = authStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      authStore.getState().logout();
    }
    return Promise.reject(err);
  }
);