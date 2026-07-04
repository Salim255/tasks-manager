import { AxiosError } from "axios";
import type { ApiErrorDto } from "../interfaces/shared.interfaces";
import { clearUser } from "../../features/auth/states/authSlice";

export const handleHttpError = (error: unknown, thunkApi: any): ApiErrorDto => {

   // 1. Handle unauthorized (from API interceptor)
    if ((error as any).isUnauthorized) {
        thunkApi.dispatch(clearUser());
    }
    // 2. Handle unauthorized directly from Axios
    if (error instanceof AxiosError && error.response?.status === 401) {
        thunkApi.dispatch(clearUser());
    }

    // 3. Normalize Axios backend error DTO
    if (error instanceof AxiosError) {
        return (
        error.response?.data || {
            status: "error",
            message: "Unknown error",
            data: null,
        }
        );
    }

  // 4. Fallback for non-Axios errors
  return {
    status: "error",
    message: "Unexpected error",
    data: null,
  };
}
