import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task, TaskPriority, TaskStatus } from "../model/task.model";

  
export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueAt: string;
}

type InitiateState = {
    tasks: Task [];
    isCreating: boolean;
}

const url = "http://localhost:8000/api/v1/users/login";

export const createTaskHttp = createAsyncThunk(
    'post/create-task',
    async (data: CreateTaskPayload, thunkAPI) => {
        try {
            const response = await axios.post(url, data);
            console.log(response);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
 const initialState: InitiateState = {
    tasks: [],
    isCreating: false,
}

const createTaskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        setBackTaskToBacklog: (state, action: PayloadAction<{task: Task}>) => {
            const taskExist = state.tasks.some((task) => task.id === action.payload.task.id );
            console.log(taskExist);
            if(taskExist) return;

            state.tasks = [
                ...state.tasks, 
                {...action.payload.task, sprintId: undefined },
            ]
        },
        addToBacklogTask: (state, action: PayloadAction<{task:Task}>) => {
            const taskExist =  state?.tasks
                ?.some((task) => task?.id === action.payload.task.id);
            
            if(taskExist) return;

           state.tasks = [...state.tasks, action.payload.task]
        },
        removeTask: (state, action: PayloadAction<Task>)  => {
            const tasks = state?.tasks
                ?.filter((task) => task.id !== action.payload.id);
            state.tasks = [...tasks];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTaskHttp.pending, (state, action) => {
            state.isCreating = true;
        })
        .addCase(createTaskHttp.fulfilled, (state, action) => {
            state.isCreating = false;
        })
        .addCase(createTaskHttp.rejected, (state, action) => {
            state.isCreating = false;
        })
    },
})

export const { setBackTaskToBacklog } = createTaskSlice.actions;
export const { addToBacklogTask } = createTaskSlice.actions;
export const { removeTask } = createTaskSlice.actions;
export default createTaskSlice.reducer;