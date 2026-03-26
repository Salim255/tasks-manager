import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { Project } from "../models/project.model";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import { setSprints } from "../states/sprintSlice";

const apiUrl = `${import.meta.env.VITE_API_URL}/projects`;

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


export const fetchSingleProjectHttp = createAsyncThunk<
    ProjectResponseDto,
        { projectId: string },
    { rejectValue: ApiErrorDto }  // error type
    >
    (
    'fetch/fetch-project',
    async ({ projectId }: { projectId: string }, thunkApi) => {
        try {
            const response = await axios.get(`${apiUrl}/${projectId}`, { withCredentials: true });
            const project  = response.data.data.project as Project;
            console.log(project);
            thunkApi.dispatch(setSprints({ sprints: project.sprints }))
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
export const createProjectHttp = createAsyncThunk<
    ProjectResponseDto,  // success type
    CreateProjectPayload, // argument type
    { rejectValue: ApiErrorDto }  // error type
    >(
    'post/createProject',
    async (data:CreateProjectPayload, thunkApi ) => {
        try {
            const result = await axios.post<ProjectResponseDto>(
                `${apiUrl}`,
                data,
                { withCredentials: true }
            );
            return result.data;
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

export const fetchProjectsHttp = createAsyncThunk<
    ProjectsResponseDto,
    void,
    { rejectValue: ApiErrorDto }  // error type
    >(
    'get/userProjects',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(
                `${apiUrl}`,
                { withCredentials: true },
            );
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