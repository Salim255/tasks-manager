import { createSlice } from "@reduxjs/toolkit";
import { authUser, refreshToken } from "../http/auth.http";
import { toast } from "react-toastify";

type  InitiateState = {
    user?: { 
        email : string;
        emailVerified: boolean;
        createdAt: string;
        role: string;
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
        .addCase(authUser .pending, (state) => {
            state.isLoading = true;
        })
        .addCase(authUser.fulfilled, (state, action) => {
            state.user = action.payload.data.data.user;
            state.isLoading = false;
            toast.success("Authentication successful");
        })
        .addCase(authUser .rejected, (state, action) => {
            console.log(action);
            state.isLoading = false;
            toast.error("Authentication failed");
        })
        .addCase(refreshToken.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(refreshToken.fulfilled, (state) => {
            state.isLoading = false;
            
        })
        .addCase(refreshToken.rejected, (state) => {
            state.isLoading = false;
        })
    }
})


// Handlers
// 1 Clear user data
export const { clearUser } = authSlice.actions;

// Reducer
export default authSlice.reducer;