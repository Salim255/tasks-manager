import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import type { Profile } from "../model/profile.model";

const apiUrl = import.meta.env.VITE_API_URL;

export type CreateProfilePayload = {
    firstName: string;
    lastName: string;
}

export type ProfileResponseDto = {
    status: string;
    data: {
        profile: Profile
    }
}


export const getUserProfileHttp = createAsyncThunk(
    'get/userProfile',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${apiUrl}/profiles`, { withCredentials: true});
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

export const createProfileHttp = createAsyncThunk<
    ProfileResponseDto,
    CreateProfilePayload,
    { rejectValue: ApiErrorDto } 
    >(
    'post/createProfile',
    async (data: CreateProfilePayload, thunkApi) => {
        try {
            const response = await axios.post<ProfileResponseDto>(
                `${apiUrl}/profiles`,
                data,
                { withCredentials: true }
            );
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