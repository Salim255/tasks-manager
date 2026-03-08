import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";
import { fetchProjects } from "../http/project.http";

type InitialState = {
    projects: Project[];
    activeProjectId?: string;
    isLoading: boolean;
}

export type CreateProjectPayload = {
  name: string; 
  description?: string, 
  status: 'active' | 'archived' 
}
 
// Initial state 
const initialState: InitialState = {
    projects: [],
    isLoading: false,
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects .pending, (state, action) => {
            state.isLoading = true;
            state = {...state, projects:  }
        } )
        .addCase(fetchProjects.fulfilled, (state, action) => {

        })
        .addCase(fetchProjects.rejected, (state, action) => {

        } )
    },
    reducers: {
        createProject: (state, action: PayloadAction<{payload: CreateProjectPayload}>) => {
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

export const { createProject, setActiveProjectId } = projectSlice.actions;
export default projectSlice.reducer;
