import axios, { type AxiosResponse } from 'axios';
import { logout } from '../features/auth/states/logout';
import type { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';

// Define the expected shape of the refresh endpoint response
type RefreshResponse = {
  status: 'success';
  data: string; // or your real DTO
};



// Create a dedicated Axios instance for your entire app
// This ensures all requests share the same config + interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies (access + refresh tokens)
});

// Flag to prevent multiple refresh calls happening at the same time
let isRefreshing = false;

// A shared promise so all failed requests wait for the SAME refresh call
let refreshPromise: Promise<AxiosResponse<RefreshResponse>> | null = null;

//// Add a global response interceptor to the Axios instance
api.interceptors.response.use(
  
  // If the response is OK → just return it
  (response) => response, 
  // If the response is an error → handle it here
  async (error) => {
    //// The original request that failed (we will retry it later)
    const originalRequest = error.config;

    // ----------------------------------------------------
    // Skip refresh logic for auth endpoints
    // ----------------------------------------------------
    const skipRefreshUrls = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh'
    ];

    if (skipRefreshUrls.some(url => originalRequest.url?.includes(url))) {
      return Promise.reject(error);
    }

    // If access token expired
    // Check if the error is 401 (access token expired)
    // AND ensure we haven't retried this request already
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Mark this request as already retried to avoid infinite loops
      originalRequest._retry = true;

      try {
        // If no refresh call is currently running → start one
        if (!isRefreshing) {
          isRefreshing = true;

          // Call the refresh endpoint
          // Save the promise so other requests can wait for it
          refreshPromise = api.post('/auth/refresh').finally(() => {
            // When refresh finishes (success or fail), allow new refresh attempts
            isRefreshing = false;
          });
        }

        // Wait for the refresh request to finish
        await refreshPromise;

        // After refresh succeeds → retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // ----------------------------------------------------
        //  Refresh failed → force logout
        // ----------------------------------------------------
        const dispatch = useDispatch<AppDispatch>();
        //console.warn("Refresh token invalid → logging out");
        logout(dispatch);
        // Call your logout logic here
        // Example:
        // store.dispatch(logout());
        // or authService.logout();

        // or window.location.href = "/login";
        return Promise.reject(refreshError);
      }
     
    }

    // If it's not a 401 or retry failed → reject the error normally

    return Promise.reject(error);
  }
);

// Export the configured Axios instance for use across your app
export default api;
