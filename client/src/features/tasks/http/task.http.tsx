import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import api from "../../../api/axios";
import type { CreateTaskPayload, CreateTaskResponseDto, GetTasksResponseDto, UpdatedTaskResponseDto, UpdateTaskPayload, UpdateTaskSprintPayload } from "../dto/task-dto";

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

export const  createTaskHttp = createAsyncThunk<
    CreateTaskResponseDto,
    CreateTaskPayload,
    { rejectValue: ApiErrorDto }
  >(
    'post/createTask',
    async (data: CreateTaskPayload, thunkApi) => {
        try {
            console.log(data);
            const response = await api.post(
               `projects/${data.projectId}/tasks`, 
                data,
                { withCredentials: true }
            );
            console.log(response);
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