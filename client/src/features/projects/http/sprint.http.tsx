import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { Sprint, SprintStatus } from "../models/sprint.model";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

export type UpdateSprintPayload = {
  name?: string;
  status?: SprintStatus;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  goal?: string;
}

export type FetchSprintsResponseDto = {
    status: string;
    data: {
        sprints: Sprint []
    }
}
export type CreateSprintPayload = {
    projectId: string
}

export type CreateSprintResponseDto = {
    status: string;
    data: {
        sprint: Sprint
    }
}

export type UpdateSprintResponseDto = CreateSprintResponseDto ;

export const updateSprintHttp = createAsyncThunk<
        UpdateSprintResponseDto,
        UpdateSprintPayload & { sprintId: string},
        { rejectValue: ApiErrorDto } 
    >(
    'update/sprint',
    async (data: UpdateSprintPayload & { sprintId: string} , thunkApi) => {
        try {
            const { sprintId, ...rest } = data;
            const response = await axios.patch(
                `${apiUrl}/sprints/${sprintId}`,
                rest,
                { withCredentials: true },
            )

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

export const fetchSprintsHttp =  createAsyncThunk<
        FetchSprintsResponseDto,
        { projectId: string },
        { rejectValue: ApiErrorDto } 
    >(
        'get/fetchSprintsByProject',
        async (data: {projectId: string}, thunkApi) => {
            try {
                const response = await axios.get(
                    `${apiUrl}/projects/${data.projectId}/sprints`,
                    { withCredentials: true }
                );
                return response.data;
            } catch (error) {
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

export const createSprint = createAsyncThunk<
    CreateSprintResponseDto,
    CreateSprintPayload,
    { rejectValue: ApiErrorDto } 
>(
    'post/createSprint',
    async (data:CreateSprintPayload , thunkApi) => {
        try {
            const response = await axios.post(`${apiUrl}/projects/${data.projectId}/sprints`, 
                {},
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
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