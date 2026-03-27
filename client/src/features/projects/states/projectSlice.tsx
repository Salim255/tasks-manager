import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";
import { fetchProjectsHttp, createProjectHttp, fetchSingleProjectHttp } from "../http/project.http";
import { addMemberHttp } from "../http/member.http";

type InitialState = {
    projects: Project[];
    activeProjectId?: string;
    activeProject?: Project;
    isLoading: boolean;
    isCreating: boolean;
    isAddMember: boolean;
    isLoadingMember: boolean;
    isFetchingProject: boolean;
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
    isAddMember: false,
    isLoadingMember: false,
    isFetchingProject: false,
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchSingleProjectHttp.pending, (state) => {
            state.isFetchingProject = true;
        })
        .addCase(fetchSingleProjectHttp.fulfilled, (state, action) => {
            const { project } = action.payload.data;
            //state.activeProject = project;
            state.isFetchingProject = false;
        })
        .addCase(fetchSingleProjectHttp.rejected, (state) => {
            state.isFetchingProject = false;
        })
        .addCase(addMemberHttp.pending, (state) => {
            state.isLoadingMember = true;
        })
        .addCase(addMemberHttp.fulfilled, (state, action) => {
            const { member } = action.payload.data;
            const candidateIndex = state.projects.findIndex((p) => p.id === member.projectId);

            if (candidateIndex === -1){
                state.isLoadingMember = false;
                return;
            };

            state.projects[candidateIndex].members.push(member);
            state.isLoadingMember = false;
        })
        .addCase(addMemberHttp.rejected, (state) => {
            state.isLoadingMember = false;
        })
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
        onAddMemberModal: (state) => {
            state.isAddMember = !state.isAddMember;
        },
        setActiveProjectId: (state, action: PayloadAction<{ projectId: string}>) => {
            const { projectId } = action.payload;
            const project = state.projects.find((p) => p.id === projectId);
            state.activeProject = project;
            state.activeProjectId = projectId;
        }
    }
});

export const { setActiveProjectId, onAddMemberModal } = projectSlice.actions;
export default projectSlice.reducer;
