import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../../../api/axios";

import { getUserProfileHttp } from "../../profile/http/profileHttp";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import { getDemoClientId } from "../../../shared/utils/demo_client_id";
import type { AuthPayload, AuthResponseDto, AuthType } from "../dto/auth-dto";


export const logoutHttp = createAsyncThunk<
    AuthResponseDto,
    {},
    { rejectValue: ApiErrorDto }
    >(
    'post/logout',
    async (_, thunkApi) => {
        try {
            const response = await api.post(
                '/auth/logout',
                {},
                { withCredentials: true }
            );
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

export const demoLoginHttp = createAsyncThunk<
    AuthResponseDto,
    { authType: AuthType },
    { rejectValue: ApiErrorDto }
    >(
    'post/demoLogin',
    async (data: { authType: AuthType }, thunkApi) => {
        try {
            const demoClientId = getDemoClientId();
            const response = await api.post(
                `/auth/${data.authType}`,
                { demoClientId },
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
  'users/loadUser',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/users/me');
      await thunkApi.dispatch(getUserProfileHttp());
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

