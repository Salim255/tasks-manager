import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

export const createProfileHttp = createAsyncThunk(
    'post/createProfile',
    async (data, thunkApi) => {
        try {
            const response = await axios.post(
                `${apiUrl}/profiles`,
                data,
                { withCredentials: true }
            );
            return response;
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