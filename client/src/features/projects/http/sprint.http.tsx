import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Sprint, SprintStatus } from "../models/sprint.model";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

export type UpdateSprintPayload = {
  ame?: string;
  status?: SprintStatus;
  startDate?: Date;
  endDate?: Date;
  completeDate?: Date;
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

export const updateSprint = createAsyncThunk(
    'update/sprint',
    async (data: , thunkApi) => {
        try {
            const {sprintId, ...rest } = data;
            const response = await axios.patch(
                `${apiUrl}/sprints/${sprintId}`,
                rest,
                { withCredentials: true },
            )
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
                // Extract your backend error shape
                const backendError: ApiErrorDto = error.response?.data || {
                    status: "error",
                    message: "Unknown error",
                    data: null
                };
                return thunkApi.rejectWithValue(backendError);
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