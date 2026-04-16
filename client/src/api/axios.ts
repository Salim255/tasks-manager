import axios, { type AxiosResponse } from 'axios';

type RefreshResponse = {
  status: 'success';
  data: string; // or your real DTO
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<AxiosResponse<RefreshResponse>> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = api.post('/auth/refresh').finally(() => {
          isRefreshing = false;
        });
      }

      await refreshPromise;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
