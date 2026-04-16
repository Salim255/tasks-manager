import { createSlice } from "@reduxjs/toolkit";
import { authUser, loadUserHttp } from "../http/auth.http";
import { toast } from "react-toastify";

type  InitiateState = {
    user?: { 
        email : string;
        emailVerified: boolean;
        createdAt: string;
        id: string,
    }
    isLoading: boolean;
}
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
        .addCase(loadUserHttp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loadUserHttp.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.isLoading = false;
        })
        .addCase(loadUserHttp.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(authUser .pending, (state) => {
            state.isLoading = true;
        })
        .addCase(authUser.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.isLoading = false;
            toast.success("Welcome back!");
        })
        .addCase(authUser .rejected, (state, action) => {
            const { message } = action.payload || { message: "Authentication failed" };
            state.isLoading = false;
            toast.error(message);
        })
    }
})


// Handlers
// 1 Clear user data
export const { clearUser } = authSlice.actions;

// Reducer
export default authSlice.reducer;