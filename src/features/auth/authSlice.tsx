import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

type  InitiateState = {
    user?: { 
        email : string;
        name: string;
        photo: string;
        role: string;
        _id: string
    }
    isLoading: boolean;
}
export type LoginPayload = { password: string; email: string};
const url = "http://localhost:8000/api/v1/users/login";
export const loginUser = createAsyncThunk(
    'post/loginUser',
    async (data: LoginPayload, thunkAPI) => {
        try {
            const response = await axios.post(url, data)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const initialState: InitiateState = {
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.isLoading = true;
            state.user = undefined;
            state.isLoading = false;
        }
    },
    // Listen to fetch or the fetch call event
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            console.log("Is pending login",action.payload);
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log("Is fulfilled user login", action.payload.data.data.user);
            state.user = action.payload.data.data.user;
            state.isLoading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.log("Is rejected  user login",action.payload); 
            state.isLoading = false;
        })
    }
})


// Handlers
// 1 Clear user data
export const { clearUser } = authSlice.actions;

// Reducer
export default authSlice.reducer;