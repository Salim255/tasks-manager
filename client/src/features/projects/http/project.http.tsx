import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Project } from "../models/project.model";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

// Thunks 
// 1 create project 
export type CreateProjectPayload = {
    name: string;
    description?: string;
}

export type ProjectResponseDto = {
    status: string;
    data: {
        project: Project
    }
}

export type ProjectsResponseDto = {
    status: string;
    data: {
        projects: Project[]
    }
}

export const createProjectHttp = createAsyncThunk<
    ProjectResponseDto,  // success type
    CreateProjectPayload, // argument type
    { rejectValue: ApiErrorDto }  // error type
>(
    'post/createProject',
    async (data:CreateProjectPayload, thunkApi ) => {
        try {
            const result = await axios.post<ProjectResponseDto>(
                `${apiUrl}/projects`,
                data,
                { withCredentials: true }
            );
            return result.data;
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
export const fetchProjectsHttp = createAsyncThunk<
ProjectsResponseDto,
void,
{ rejectValue: ApiErrorDto }  // error type
>(
    'get/userProjects',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(
                `${apiUrl}/projects`,
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