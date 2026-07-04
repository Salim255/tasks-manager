import { AxiosError } from "axios";
import type { ApiErrorDto } from "../interfaces/shared.interfaces";

export const handleHttpError = (error: unknown, thunkApi: any): ApiErrorDto => {
  // 1. Handle unauthorized (tagged by API interceptor)
  if ((error as any).isUnauthorized) {
    //thunkApi.dispatch(startLogout);
  }

  // 2. Normalize Axios backend error DTO
  if (error instanceof AxiosError) {
    return (
      error.response?.data || {
        status: "error",
        message: "Unknown error",
        data: null,
      }
    );
  }

  // 3. Fallback for non-Axios errors
  return {
    status: "error",
    message: "Unexpected error",
    data: null,
  };
}
