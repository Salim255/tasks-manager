import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authUser, demoLoginHttp, loadUserHttp } from "../http/auth.http";
import { toast } from "react-toastify";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";

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
    isLoggingOut: boolean;
}
const initialState: InitiateState = {
    user: null,
    isLoading: true,
    isLoggingOut: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.isLoading = true;
            state.user = null;
            state.isLoading = false;
            state.isLoggingOut = false;
        }
    },
    // Listen to fetch or the fetch call event
    extraReducers: (builder) => {
        builder
        .addCase('auth/logoutHttp/pending', (state) => {
            state.isLoading = true;
        })
        .addCase('auth/logoutHttp/fulfilled', (state) => {
            state.user = null;
            state.isLoading = false;
            //toast.success("Logged out successfully");
        })
        .addCase('auth/logoutHttp/rejected', (state, action) => {
            const errorAction = action as PayloadAction<ApiErrorDto>;
            console.log(action)
            state.isLoading = false;
           // state.error = errorAction.payload.message;
            state.user = null; // Ensure user is cleared on logout failure
        })
        /*  */
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
        /*  */
        .addCase(loadUserHttp.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loadUserHttp.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.isLoading = false;
        })
        .addCase(loadUserHttp.rejected, (state, action) => {
            state.isLoading = false;
            // Because your API ALWAYS returns ApiErrorDto,
            // we can safely cast the payload.
            const errorPayload = action.payload as ApiErrorDto;
     
            state.isLoggingOut = true;

            console.log(errorPayload.message, "hello form error")
        })
        /*  */
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