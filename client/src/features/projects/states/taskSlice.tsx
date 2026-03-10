import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task  } from "../models/task.model";
import { createTaskHttp, getTasksHttp } from "../http/task.http";

  

type InitiateState = {
    tasks: Task [];
    isCreating: boolean;
    isLoading: boolean;
}


 const initialState: InitiateState = {
    tasks: [],
    isCreating: false,
    isLoading: false,
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
        .addCase(getTasksHttp.pending, (state, action) => {
           console.log(action);
        })
        .addCase(getTasksHttp.fulfilled, (state, action) => {
           console.log(action.payload);
           const {tasks} = action.payload.data;
           state.tasks = [...tasks];
           state.isLoading = false;
        })
        .addCase(getTasksHttp.rejected, (state, action) => {
            console.log(action.error);
            state.isLoading = false
        })
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