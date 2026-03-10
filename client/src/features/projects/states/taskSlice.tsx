import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task  } from "../models/task.model";
import { createTaskHttp } from "../http/task.http";

  

type InitiateState = {
    tasks: Task [];
    isCreating: boolean;
}


 const initialState: InitiateState = {
    tasks: [],
    isCreating: false,
}

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setBackTaskToBacklog: (state, action: PayloadAction<{ task: Task }>) => {
            const { task } = action.payload;

            const taskExist = state.tasks.some((t) => t.id === task.id );

            if(taskExist) return;

            state.tasks = [
                ...state.tasks, 
                {...task, sprintId: undefined },
            ]
        },

        addToBacklogTask: (state, action: PayloadAction<{ task: Task }>) => {
            const { task } = action.payload;

            const taskExist =  state?.tasks
                ?.some((t) => t?.id === task.id);
            
            if(taskExist) return;

           state.tasks = [...state.tasks, task]
        },
        removeTask: (state, action: PayloadAction<{ task: Task }>)  => {
            const { task } = action.payload;

            const tasks = state?.tasks?.filter((t) => t.id !== task.id);

            state.tasks = [...tasks];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTaskHttp.pending, (state, action) => {
            console.log(action);
            state.isCreating = true;
        })
        .addCase(createTaskHttp.fulfilled, (state, action) => {
            const { task } = action.payload.data;
            state.tasks = [...state.tasks, task];
            state.isCreating = false;
        })
        .addCase(createTaskHttp.rejected, (state, action) => {
            console.log(action);
            state.isCreating = false;
        })
    },
})

export const { setBackTaskToBacklog } = taskSlice.actions;
export const { addToBacklogTask } = taskSlice.actions;
export const { removeTask } = taskSlice.actions;

export default taskSlice.reducer;