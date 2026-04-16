import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../../api/axios";

import { getUserProfileHttp } from "../../profile/http/profileHttp";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

export type AuthType = "login" | "register";
export type AuthPayload = { password: string; email: string, authType: AuthType };
export type AuthResponseDto = {
    status: string;
    data: {
        user: {
            id: string,
            email : string;
            emailVerified: boolean;
            createdAt: string;
        }
    }
}
    
export const authUser = createAsyncThunk<
    AuthResponseDto,
    AuthPayload,
    { rejectValue: ApiErrorDto }
    >(
    'post/authUser',
    async (data: AuthPayload, thunkApi) => {
        try {
            const response = await api.post(
                `/auth/${data.authType}`,
                { email: data.email, password: data.password },
                { withCredentials: true }
            )
            thunkApi.dispatch(getUserProfileHttp());
            return response.data;
        } catch (error) {
            // Extract your backend error shape
            if (error instanceof AxiosError) {
                const backendError: ApiErrorDto = error.response?.data || {
                    status: "error",
                    message: "Unknown error",
                    data: null
                };

                return thunkApi.rejectWithValue(backendError);
            }
            // fallback for non-Axios errors
            return thunkApi.rejectWithValue({
                status: "error",
                message: "Unexpected error",
                data: null
            });
        }
    }
)

export const loadUserHttp = createAsyncThunk(
  'auth/loadUser',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (error) {
        // Extract your backend error shape
        if (error instanceof AxiosError) {
            const backendError: ApiErrorDto = error.response?.data || {
                status: "error",
                message: "Unknown error",
                data: null
            };

            return thunkApi.rejectWithValue(backendError);
        }
        // fallback for non-Axios errors
        return thunkApi.rejectWithValue({
            status: "error",
            message: "Unexpected error",
            data: null
        });
    }
  }
);

