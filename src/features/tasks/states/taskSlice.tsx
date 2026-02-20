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
        addTask: (state, action: PayloadAction<Task>) => {
           console.log(action);
           state.tasks = [...state.tasks, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTaskHttp.pending, (state, action) => {
            console.log(action.type, state);
            state.isCreating = true;
        })
        .addCase(createTaskHttp.fulfilled, (state, action) => {
            console.log(action)
            state.isCreating = false;
        })
        .addCase(createTaskHttp.rejected, (state, action) => {
            console.log(action);
            state.isCreating = false;
        })
    },
})

export const { addTask } = createTaskSlice.actions;
export default createTaskSlice.reducer;