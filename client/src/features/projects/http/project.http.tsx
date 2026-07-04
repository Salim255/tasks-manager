import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";
import { type ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import api from "../../../api/axios";
import { setSprints } from "../../sprints/states/sprintSlice";
import { setTasks } from "../../tasks/states/taskSlice";
import { setMembers } from "../../members/states/memberSlice";
import { handleHttpError } from "../../../shared/http/handleHttpError";

// 1 create project 
export type CreateProjectPayload = {
    name: string;
    description?: string;
    key: string;
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
            const include = ["tasks", "sprints", "members", "owner"];

            const url = `projects/${projectId}?include=${include.join(",")}`;

            const response = await api.get(`${url}`, { withCredentials: true });
        
            const project  = (response.data.data.project) as Project;

            if (project?.sprints) thunkApi.dispatch(setSprints({ sprints: project.sprints }));

            if (project?.tasks) thunkApi.dispatch(setTasks({ tasks: project.tasks }));

            if (project?.members) thunkApi.dispatch(setMembers({ members: project.members }));

            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
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
            const result = await api.post<ProjectResponseDto>(
                `projects`,
                data,
                { withCredentials: true }
            );
            return result.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
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
            const response = await api.get(
                `projects`,
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)