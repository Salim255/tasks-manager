// 1 http
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sprint, SprintStatus } from "../models/sprint.model";
import type { Task, TaskStatus } from "../models/task.model";
import type { AppDispatch, RootState } from "../../../redux/store";
import { createSprint } from "../http/sprint.http";


// 2 initial state
type StateType  = {
    sprints: Sprint[];
    isLoading: boolean;
    isCreating: boolean;
}
const initialState: StateType = {
    sprints: [],
    isLoading: false,
    isCreating: false,
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
        .addCase(createSprint.pending,(state, action) => {
            state.isCreating = true;
        })
        .addCase(createSprint.fulfilled, (state, action) => {
            const {sprint} = action.payload.data;
            state.sprints = [...state.sprints, sprint];
            state.isCreating = false;
        })
        .addCase(createSprint.rejected, (state, action) => {
            state.isCreating = false;
        })
    },
    reducers: {
        onUpdateSprintStatus: (state, action: PayloadAction<{ sprintId: string, status: SprintStatus }>) => {
            const { sprintId, status } = action.payload;
            const sprintIndex = state.sprints.findIndex(sprint => sprint.id === sprintId);
            if (sprintIndex !== -1) {
               state.sprints[sprintIndex].status = status;
            }
        },
        updateSprintSingleTaskStatus: (
            state, 
            action: PayloadAction<{ task: Task, status: TaskStatus}>,
        ) => {
            const { task, status } = action.payload;
            // 1 Find the sprint
            const sprintIndex = state?.sprints
                ?.findIndex((sprint) => sprint.id === task.sprintId);
          
            if (sprintIndex === -1) return;

            // 2 Concerned sprint
            const concernedSprint = state.sprints[sprintIndex];

            // 3 Update task status in sprint
            concernedSprint.tasks = concernedSprint?.tasks
                ?.map((tsk) => tsk.id === task.id ? {...tsk, status: status} : tsk);

            // 4 Update state
            state.sprints[sprintIndex] = concernedSprint;

        },
        removeTaskFromSprint: (
            state, 
            action: PayloadAction<{sprintId: string, taskId: string}>,
        ) => {
            // 1 Find the sprint
            const sprintIndex = state?.sprints
                ?.findIndex((sprint) => sprint.id === action.payload.sprintId);
          
            if (sprintIndex === -1) return;

            // 2 Concerned sprint
            const concernedSprint = state.sprints[sprintIndex];

            // 3 Remove task from sprint
            concernedSprint.tasks = concernedSprint?.tasks
                ?.filter((task) => task.id !== action.payload.taskId);

            // 4 Update state
            state.sprints[sprintIndex] = concernedSprint;

        },
        addSprint: (state, action: PayloadAction<Sprint> ) => {
            state.sprints = [...state.sprints , action.payload]
        },
        addTaskToSprint: (
            state, 
            action: PayloadAction<{ task: Task, sprintId: string }>,
        ) => {

            const { task, sprintId } = action.payload;

            // 1. Remove task from all sprints 
            state.sprints.forEach(
                sprint => { sprint.tasks = sprint.tasks.filter(t => t.id !== task.id); }
            );
          

            // Add the the task to the sprint
            const sprintIndex = state.sprints
                ?.findIndex((sprint) => sprint.id === sprintId);   

            if (sprintIndex === -1) return;
 

            // Else add task
            // 3. Add task to the correct sprint 
            state.sprints[sprintIndex].tasks.push({ ...task, sprintId });

        }
    },

})

// Export other reducers
export const { onUpdateSprintStatus } = sprintSlice.actions;
export const { updateSprintSingleTaskStatus } = sprintSlice.actions;
export const { removeTaskFromSprint } = sprintSlice.actions;
export const { addTaskToSprint } = sprintSlice.actions;
export const { addSprint } = sprintSlice.actions;
//  Export reducer
export default sprintSlice.reducer;