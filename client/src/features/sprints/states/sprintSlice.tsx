// 1 http
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import type { Sprint, SprintStatus } from "../model/sprint.model";
import { createSprint, fetchSprintsHttp, updateSprintHttp } from "../http/sprint.http";


// 2 initial state
type StateType  = {
    sprints: Sprint[];
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;

    isOpenModal: boolean;

    sprint?: Sprint;
}
const initialState: StateType = {
    sprints: [],
    isLoading: false,
    isCreating: false,
    isUpdating: false,

    isOpenModal: false
    
};

// Thunks
export const updateSprintStatus = ({
    sprintId,
    status,
}: { 
    sprintId: string;
    status: SprintStatus
} ) => (dispatch: AppDispatch , getState: () => RootState) => {
    // Update the sprint
    dispatch(onUpdateSprintStatus({ sprintId, status}));

    const updatedSprint =
        getState()
        .sprintReducer
        .sprints
        .find((sprint) => sprint.id === sprintId);

    if (!updatedSprint) return;
    //dispatch(updateSprintStatus());
}

// 3 create slice
const sprintSlice = createSlice({
    name: 'sprintSlice',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(updateSprintHttp.pending, (state) => {
            state.isUpdating = true;
        })
        .addCase(updateSprintHttp.fulfilled, (state, action) => {
            const { sprint } = action.payload.data;
            console.log(sprint);
            state.sprints = state.sprints.map((spt) =>  spt.id === sprint.id ? sprint : spt );
            state.isUpdating = false;
        })
        .addCase(updateSprintHttp.rejected, (state) => {
            state.isUpdating = false;
            toast.error("Failed to update sprint. Please try again.");
        })
        .addCase(fetchSprintsHttp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchSprintsHttp.fulfilled, (state, action) => {
            const {sprints } = action.payload.data;
            state.sprints = sprints;
            state.isLoading = false;
        })
        .addCase(fetchSprintsHttp.rejected, (state) => {
            state.isLoading = false;
        })

        .addCase(createSprint.pending,(state) => {
            state.isCreating = true;
        })
        .addCase(createSprint.fulfilled, (state, action) => {
            const { sprint } = action.payload.data;
            state.sprints = [...state.sprints, sprint];
            state.isCreating = false;
        })
        .addCase(createSprint.rejected, (state) => {
            state.isCreating = false;
            toast.error("Failed to create sprint. Please try again.");
        })
    },
    reducers: {
        setSprints: (state, action: PayloadAction<{sprints: Sprint[]}>) => {
            const { sprints } = action.payload;
            state.sprints = sprints;
        },
        onUpdateSprintStatus: (state, action: PayloadAction<{ sprintId: string, status: SprintStatus }>) => {
            const { sprintId, status } = action.payload;
            const sprintIndex = state.sprints.findIndex(sprint => sprint.id === sprintId);
            if (sprintIndex !== -1) {
               state.sprints[sprintIndex].status = status;
            }
        },
        addSprint: (state, action: PayloadAction<Sprint> ) => {
            state.sprints = [...state.sprints , action.payload]
        },
        openEditSprintModal: (state, action:  PayloadAction<{ sprintId: string }>) => {
            const { sprintId } = action.payload;
            const candidateSprint = state.sprints.find((spr) => spr.id === sprintId);
            state.sprint = candidateSprint;
            state.isOpenModal = true;
        },
        closeEditSprint: (state) => {
            state.isOpenModal = false;
            state.sprint = undefined;
        }
    },

})

// Export other reducers
export const { openEditSprintModal, closeEditSprint, setSprints } = sprintSlice.actions;
export const { onUpdateSprintStatus } = sprintSlice.actions;
export const { addSprint } = sprintSlice.actions;
//  Export reducer
export default sprintSlice.reducer;