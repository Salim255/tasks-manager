import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Sprint } from "../models/sprint.model";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

export type CreateSprintPayload = {
    projectId: string
}

export type CreateSprintResponseDto = {
    status: string;
    data: {
        sprint: Sprint
    }
}

export const createSprint = createAsyncThunk<
    CreateSprintResponseDto,
    CreateSprintPayload,
    { rejectValue: ApiErrorDto } 
>(
    'post/createSprint',
    async (data:CreateSprintPayload , thunkApi) => {
        try {
            const response = await axios.post(`${apiUrl}/sprints`, data, { withCredentials: true } );
            return response.data;
        } catch (error) {
            // Extract your backend error shape
            const backendError: ApiErrorDto = error.response?.data || {
                status: "error",
                message: "Unknown error",
                data: null
            };
            return thunkApi.rejectWithValue(backendError);
        }
    }
)