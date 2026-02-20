// 1 http
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sprint } from "../model/sprint.model";
import type { Task } from "../model/task.model";

// 2 intial state
type StateType  = {
    sprints: Sprint[];
    isLoading: false 
}
const initialState: StateType = {
    sprints: [],
    isLoading: false
};
// 3 create slice
const createSprintSlice = createSlice({
    name: 'sprintSlice',
    initialState,
    reducers: {
        removeTaskFromSprint: (state, action: PayloadAction<{sprintId: string, taskId: string}>) => {
            // 1 Find the sprint
            const sprintIndex = state.sprints.findIndex((sprint) => sprint.id === action.payload.sprintId);
                console.log(sprintIndex , "hello world")
            // 2 Concerned sprint
            const concernedSprint = state.sprints[sprintIndex];

            // 3 Remove task from sprint
            concernedSprint.tasks = concernedSprint.tasks.filter((task) => task.id !== action.payload.taskId);

            // 4 Update state
            state.sprints[sprintIndex] = concernedSprint;

        },
        addSprint: (state, action: PayloadAction<Sprint> ) => {
            state.sprints = [...state.sprints , action.payload]
        },
        addTaskToSprint: (state, action: PayloadAction<{ task: Task, sprintId: string }>) => {
            // Add the the task to the sprint
            const sprintIndex = state.sprints?.findIndex((sprint) => sprint.id === action.payload.sprintId);        
            if (sprintIndex === -1) return;
            // 
            state.sprints[sprintIndex] = {
                ...state.sprints[sprintIndex], 
                tasks: [...state.sprints[sprintIndex].tasks, 
                {...action.payload.task, sprintId: state.sprints[sprintIndex].id },
            ],
            }
        }
    },

})

// Export other reducers
export const { removeTaskFromSprint } = createSprintSlice.actions;
export const { addTaskToSprint } = createSprintSlice.actions;
export const { addSprint } = createSprintSlice.actions;
//  Export reducer
export default createSprintSlice.reducer;