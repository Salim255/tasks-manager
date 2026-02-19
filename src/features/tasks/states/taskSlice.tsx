import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task, TaskPriority, TaskStatus } from "../model/task.model";

  
export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueAt: string;
}

type  InitiateState = {
    user?: Task;
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
    isCreating: false,
}

const createTaskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createTaskHttp.pending, (state, action) => {
            console.log(action.type, state)
        })
        .addCase(createTaskHttp.fulfilled, (state, action) => {
            console.log(action)
        })
        .addCase(createTaskHttp.rejected, (state, action) => {
            console.log(action)
        })
    },
})

export default createTaskSlice.reducer;