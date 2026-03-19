import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";
import { fetchProjectsHttp, createProjectHttp } from "../http/project.http";

type InitialState = {
    projects: Project[];
    activeProjectId?: string;
    activeProject?: Project;
    isLoading: boolean;
    isCreating: boolean;
}

export type CreateProjectPayload = {
  name: string; 
  description?: string,
}
 
// Initial state 
const initialState: InitialState = {
    projects: [],
    isLoading: false,
    isCreating: false,
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createProjectHttp.pending, (state) => {
            state.isCreating = true;
        })
        .addCase(createProjectHttp.fulfilled, (state, action) => {
            const { project } = action.payload.data;
            if (!project) return;
             state.projects = [...state.projects, project ];
            state.isCreating = false;
        })
        .addCase(createProjectHttp.rejected, (state) => {
            state.isCreating = false;
        })
        .addCase(fetchProjectsHttp.fulfilled, (state, action) => {
            const { projects } = action.payload.data;
            state.projects = projects;
            state.isLoading = false;
        })
        .addCase(fetchProjectsHttp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProjectsHttp.rejected, (state) => {
            state.isLoading = false;
        })
    },
    reducers: {
        setActiveProjectId: (state, action: PayloadAction<{ projectId: string}>) => {
            const { projectId } = action.payload;
            const project = state.projects.find((p) => p.id === projectId);
            state.activeProject = project;
            state.activeProjectId = projectId;
            return state;
        }
    }
});

export const { setActiveProjectId } = projectSlice.actions;
export default projectSlice.reducer;
