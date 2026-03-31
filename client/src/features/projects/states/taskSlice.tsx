import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task  } from "../models/task.model";
import { createTaskHttp, getTasksHttp, updateTasHttp, updateTaskSprintHttp } from "../http/task.http";

type InitiateState = {
    tasks: Task [];
    task?: Task;
    isCreating: boolean;
    isLoading: boolean;
    isUpdating: boolean;
    isOpen: boolean;
}

const initialState: InitiateState = {
    tasks: [],
    isCreating: false,
    isLoading: false,
    isUpdating: false,
    isOpen: false,
}

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        clearTasks: (state) => {
            state.tasks = [];
        },
        setTasks: (state, action: PayloadAction<{tasks: Task[]}>) => {
            const { tasks } = action.payload;
            state.tasks = tasks;
        },
        isEditingTask: (state, action: PayloadAction<{taskId: string}>) => {
            const {taskId} = action.payload;
            if (taskId) return;
            const task = state.tasks.find((ts) => ts.id === taskId);
            state.task = task;
            state.isUpdating = true;
        },
        
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
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateTasHttp.pending, (state) => {
            state.isUpdating = true; 
        })
        .addCase(updateTasHttp.fulfilled, (state, action) => {
            const { task } = action.payload.data;
            state.tasks = state.tasks.map((t) => {
                return  t.id === task.id ? task: t;
            });
            state.isUpdating = false;
        })
        .addCase(updateTasHttp.rejected, (state) => {
            state.isUpdating = false;
        })
        .addCase(updateTaskSprintHttp.pending, (state) => {
            state.isUpdating = true; 
        })
        .addCase(updateTaskSprintHttp.fulfilled, (state, action) => {
            const { task } = action.payload.data;
            state.tasks = state.tasks.map((t) => {
                return  t.id === task.id ? task: t;
            });
            state.isUpdating = false;
        })
        .addCase(updateTaskSprintHttp.rejected, (state) => {
            state.isUpdating = false
        })
        .addCase(getTasksHttp.pending, (state) => {
           state.isLoading = true;
        })
        .addCase(getTasksHttp.fulfilled, (state, action) => {
           const {tasks} = action.payload.data;
           state.tasks = [...tasks];
           state.isLoading = false;
        })
        .addCase(getTasksHttp.rejected, (state, action) => {
            console.log(action.error);
            state.isLoading = false
        })
        .addCase(createTaskHttp.pending, (state) => {
            state.isCreating = true;
        })
        .addCase(createTaskHttp.fulfilled, (state, action) => {
            const { task } = action.payload.data;
            state.tasks = [...state.tasks, task];
            state.isCreating = false;
        })
        .addCase(createTaskHttp.rejected, (state) => {
            state.isCreating = false;
        })

    },
})

export const {
    isEditingTask,
    setTasks,
    setBackTaskToBacklog,
    addToBacklogTask,
    removeTask,
} = taskSlice.actions;


export const { clearTasks }= taskSlice.actions;
export default taskSlice.reducer;