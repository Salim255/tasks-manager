import axios from 'axios';
import { dispatch } from "../redux/store";

// Create a dedicated Axios instance for your entire app
// This ensures all requests share the same config + interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies (access + refresh tokens)
});

// Export the configured Axios instance for use across your app
export default api;
