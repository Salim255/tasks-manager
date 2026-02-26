import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";

type InitialState = {
    projects: Project[];
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

// 

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
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
            state.projects = [...state.projects, newProject ];
            state.isLoading = false;
            return state;
        }
    }
});

export const { createProject } = projectSlice.actions;
export default projectSlice.reducer;
