import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import api from "../../../api/axios";
import type { CreateSprintPayload, CreateSprintResponseDto, FetchSprintsResponseDto, UpdateSprintPayload, UpdateSprintResponseDto } from "../dto/sprint-dto";
import { handleHttpError } from "../../../shared/http/handleHttpError";


export const updateSprintHttp = createAsyncThunk<
        UpdateSprintResponseDto,
        UpdateSprintPayload & { sprintId: string},
        { rejectValue: ApiErrorDto } 
    >(
    'update/sprint',
    async (data: UpdateSprintPayload & { sprintId: string} , thunkApi) => {
        try {
            const { sprintId, ...rest } = data;
            const response = await api.patch(
                `sprints/${sprintId}`,
                rest,
                { withCredentials: true },
            )

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
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
                const response = await api.get(
                    `projects/${data.projectId}/sprints`,
                    { withCredentials: true }
                );
                return response.data;
            } catch (error) {
                return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
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
            const response = await api.post(`projects/${data.projectId}/sprints`, 
                {},
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)