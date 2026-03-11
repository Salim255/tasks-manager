import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import type { TaskStatus } from "../forms/taskFormBuilder";
import type { Task, TaskType } from "../models/task.model";

const apiUrl = import.meta.env.VITE_API_URL;


export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    assigneeId?: string;
    taskType: TaskType;
    dueAt?: string;
    projectId: string;
}

export type CreateTaskResponseDto = {
    status: string;
    data: {
        task: Task
    }

}

export type GetTasksResponseDto = {
    status: string;
    data: {
        tasks: Task []
    }
}

//tasks/71d008a6-2beb-46a9-9a4f-5bfd94f9625b/sprint
export const updateTaskSprint = createAsyncThunk(
    'update/taskSprint',
    async (data: { sprintId: string,  taskId: string}, thunkApi) => {
        try {
            const response = await axios.patch(`${apiUrl}/tasks/${data.sprintId}/sprint`, 
                {sprintId: data.sprintId},
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
)
export const  createTaskHttp = createAsyncThunk<
    CreateTaskResponseDto,
    CreateTaskPayload,
    { rejectValue: ApiErrorDto }
  >(
    'post/createTask',
    async (data: CreateTaskPayload, thunkApi) => {
        try {
            console.log(data);
            const response = await axios.post(
               `${apiUrl}/projects/${data.projectId}/tasks`, 
                data,
                { withCredentials: true }
            );
            console.log(response);
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


export const getTasksHttp = createAsyncThunk<
    GetTasksResponseDto,
    { projectId : string },
    { rejectValue: ApiErrorDto }
>(
    'get/getTasks',
    async (projectId : {projectId: string}, thunkApi) => {
        try {
            const response = await axios.get(
                `${apiUrl}/projects/${projectId.projectId}/tasks`,
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