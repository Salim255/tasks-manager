import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import api from "../../../api/axios";
import type { CreateTaskPayload, CreateTaskResponseDto, GetTasksResponseDto, UpdatedTaskResponseDto, UpdateTaskPayload, UpdateTaskSprintPayload } from "../dto/task-dto";
import { handleHttpError } from "../../../shared/http/handleHttpError";

export const updateTasHttp = createAsyncThunk<
    UpdatedTaskResponseDto,
    UpdateTaskPayload & { taskId: string },
     { rejectValue: ApiErrorDto }
    >(
        'update/updateTask',
        async (data: UpdateTaskPayload & { taskId: string }, thunkApi) => {
            try {
                const {taskId, ...rest} = data;
                const response = await api.patch(
                    `tasks/${taskId}`,
                    rest,
                    { withCredentials: true }
                );
                return response.data;
            } catch (error) {
                return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
            }
        }
    );
    
export const updateTaskSprintHttp = createAsyncThunk<
    UpdatedTaskResponseDto,
    UpdateTaskSprintPayload,
    { rejectValue: ApiErrorDto }
    >(
        'update/task-sprint',
        async (data: UpdateTaskSprintPayload , thunkApi) => {
            try {
                const response = await api.patch(
                    `tasks/${data.taskId}/sprint`, 
                    { sprintId: data.sprintId },
                    { withCredentials: true }
                );
                return response.data;
            } catch (error) {
                return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
            }
        }
    );

export const  createTaskHttp = createAsyncThunk<
    CreateTaskResponseDto,
    CreateTaskPayload,
    { rejectValue: ApiErrorDto }
  >(
    'post/createTask',
    async (data: CreateTaskPayload, thunkApi) => {
        try {
            const response = await api.post(
               `projects/${data.projectId}/tasks`, 
                data,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)


export const getTasksHttp = createAsyncThunk<
    GetTasksResponseDto,
    { projectId : string },
    { rejectValue: ApiErrorDto }
>(
    'get/getTasks',
    async (projectId : {projectId: string}, thunkApi) => {
        try {
            const response = await api.get(
                `projects/${projectId.projectId}/tasks`,
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)