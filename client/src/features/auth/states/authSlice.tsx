import { createSlice } from "@reduxjs/toolkit";
import { authUser, demoLoginHttp, loadUserHttp, logoutHttp } from "../http/auth.http";
import { toast } from "react-toastify";

type  InitiateState = {
    user: { 
        id: string;
        email : string;
        emailVerified: boolean;
        createdAt: string;
        isDemo: boolean;
        demoClientId: string | null;
    } | null;
    isLoading: boolean;
}
const initialState: InitiateState = {
    user: null,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.isLoading = true;
            state.user = null;
            state.isLoading = false;
        }
    },
    // Listen to fetch or the fetch call event
    extraReducers: (builder) => {
        builder
        .addCase(logoutHttp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutHttp.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            toast.success("Logged out successfully");
        })
        .addCase(logoutHttp.rejected, (state, action) => {
            const { message } = action.payload || { message: "Logout failed" };
            state.isLoading = false;
            state.user = null; // Ensure user is cleared on logout failure
            toast.error(message);
        })
        .addCase(demoLoginHttp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(demoLoginHttp.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.isLoading = false;
            toast.success("Welcome to the demo!");
        })
        .addCase(demoLoginHttp.rejected, (state, action) => {
            const { message } = action.payload || { message: "Demo login failed" };
            state.isLoading = false;
            toast.error(message);
        })
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
        .addCase(authUser.pending, (state) => {
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