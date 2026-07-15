import axios from 'axios';

// Create a dedicated Axios instance for your entire app
// This ensures all requests share the same config + interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies (access + refresh tokens)
});

// Export the configured Axios instance for use across your app
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.status ===  "401") {
      (error as any).isUnauthorized = true;
    }
    return Promise.reject(error); // REQUIRED
  })
export default api;
