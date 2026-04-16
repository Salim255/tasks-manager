import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import type { TaskStatus } from "../forms-builders/taskFormBuilder";
import type { Task, TaskType } from "../models/task.model";
import api from "../../../api/axios";

export type UpdateTaskPayload = {
  title?: string;
  status?: TaskStatus;
  taskType?: TaskType;
  assigneeId?: string;
  dueAt?: string;
  priority?: 'low' | 'medium' | 'high';
  sprintId?: string 
  description?: string;
}

export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    assigneeId?: string;
    taskType: TaskType;
    dueAt?: string;
    projectId: string;
}

export type UpdateTaskSprintPayload = {
    taskId: string;
    sprintId: string | null;
};

export type CreateTaskResponseDto = {
    status: string;
    data: {
        task: Task
    }
}

export type  UpdatedTaskResponseDto = CreateTaskResponseDto;

export type GetTasksResponseDto = {
    status: string;
    data: {
        tasks: Task []
    }
}

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