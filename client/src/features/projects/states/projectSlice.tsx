import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";
import {
    fetchProjectsHttp,
    createProjectHttp,
    fetchSingleProjectHttp,
    fetchDashboardOverviewHttp
} from "../http/project.http";
import { toast } from "react-toastify";
import { addMemberHttp } from "../../members/http/member.http";
import type { DashboardOverviewDto } from "../dto/dashboard-overview.dto";

type InitialState = {
    projects: Project[];
    dashboardView?: DashboardOverviewDto;
    activeProjectId?: string;
    activeProject?: Project;

    isLoading: boolean;
    isCreating: boolean;
    isAddMember: boolean;
    isLoadingMember: boolean;
    isFetchingProject: boolean;
    isFetchingDashboard: boolean;
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
    isFetchingDashboard: false,
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchDashboardOverviewHttp.pending, (state) =>{
            state.isFetchingDashboard = true
        })
        .addCase(fetchDashboardOverviewHttp.fulfilled, (state, action) => {
            state.dashboardView = action.payload.data.dashboardData;
            state.isFetchingDashboard = false;
        })
        .addCase(fetchDashboardOverviewHttp.rejected, (state) => {
            state.isFetchingDashboard = false;
        })

        .addCase(fetchSingleProjectHttp.pending, (state) => {
            state.isFetchingProject = true;
        })
        .addCase(fetchSingleProjectHttp.fulfilled, (state, action) => {
            const { project } = action.payload.data;
            state.activeProject = project;
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
            toast.error("Failed to add member. Please try again.");
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
            toast.error("Failed to create project. Please try again.");
        })
        .addCase(fetchProjectsHttp.pending, (state) => {
            console.log("Its loading")
            state.isLoading = true;
        })
        .addCase(fetchProjectsHttp.fulfilled, (state, action) => {
            const { projects } = action.payload.data;
            state.projects = projects;
            state.isLoading = false;
        })
        .addCase(fetchProjectsHttp.rejected, (state) => {
            state.isLoading = false;
        })
    },
    reducers: {
        clearProjects: (state) => {
            state.projects = [];
            state.activeProject = undefined;
            state.activeProjectId = undefined;
        },
        onAddMemberModal: (state) => {
            state.isAddMember = !state.isAddMember;
        },
        setActiveProject: (state, action: PayloadAction<{ projectId: string}>) => {
            const { projectId } = action.payload;
            const project = state.projects.find((p) => p.id === projectId);
            state.activeProject = project;
            state.activeProjectId = projectId;
        }
    }
});

export const { setActiveProject, onAddMemberModal, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
