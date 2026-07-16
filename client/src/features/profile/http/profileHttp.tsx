import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import type { Profile } from "../model/profile.model";
import api from "../../../api/axios";
import { handleHttpError } from "../../../shared/http/handleHttpError";


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
            const response = await api.get(`/profiles`, { withCredentials: true});
            return response?.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
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
            const response = await api.post<ProfileResponseDto>(
                `/profiles`,
                data,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)