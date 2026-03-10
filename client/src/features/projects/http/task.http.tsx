import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import type { TaskStatus } from "../forms/taskFormBuilder";
import type { Task } from "../models/task.model";

const apiUrl = import.meta.env.VITE_API_URL;

export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    assigneeId?: string;
    dueAt?: string;
    projectId: string;
}

export type CreateTaskResponseDto = {
    status: string;
    data: {
        task: Task
    }
}

export const  createTaskHttp = createAsyncThunk<
    CreateTaskResponseDto,
    CreateTaskPayload,
    { rejectValue: ApiErrorDto }
  >(
    'post/createTask',
    async (data: CreateTaskPayload, thunkApi) => {
        try {
            const response = await axios.post(
               `${apiUrl}/projects${data.projectId}/tasks`, 
                data,
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
            thunkApi.rejectWithValue(backendError);
        }
    }
)