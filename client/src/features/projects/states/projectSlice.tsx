import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";
import { fetchProjectsHttp, createProjectHttp } from "../http/project.http";

type InitialState = {
    projects: Project[];
    activeProjectId?: string;
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
        .addCase(createProjectHttp.rejected, (state, action) => {
            state.isCreating = false;
        })
        .addCase(fetchProjectsHttp.fulfilled, (state, action) => {
            const { projects } = action.payload.data;
            console.log(projects);
            state.projects = projects;
            state.isLoading = false;
        })
        .addCase(fetchProjectsHttp.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchProjectsHttp.rejected, (state, action) => {
            state.isLoading = false;
        } )
    },
    reducers: {
        createProjectr: (state, action: PayloadAction<{payload: CreateProjectPayload}>) => {
            state.isLoading = true;
            const { name, description, status } = action.payload.payload;
            const newProject: Project = {
                id: String(state.projects.length + 1) ,
                name: name,
                description: description,
                status: status,
                ownerId: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            const index = state.projects.length;
            if (index === 4) return;

            state.projects = [...state.projects, newProject];
            state.isLoading = false;
            return state;
        },
        setActiveProjectId: (state, action: PayloadAction<{ projectId: string}>) => {
            const { projectId } = action.payload;
            state.activeProjectId = projectId;
            return state;
        }
    }
});

export const { createProjectr, setActiveProjectId } = projectSlice.actions;
export default projectSlice.reducer;
