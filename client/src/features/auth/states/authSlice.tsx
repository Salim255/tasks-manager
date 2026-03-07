import { createSlice } from "@reduxjs/toolkit";
import { authUser, refreshToken } from "../http/auth.http";

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
        .addCase(authUser .pending, (state, action) => {
            console.log("Is pending login",action.payload);
            state.isLoading = true;
        })
        .addCase(refreshToken.pending, (state, action) => {
            console.log(action.type)
            return state;
        })

        .addCase(authUser.fulfilled, (state, action) => {
            console.log("Is fulfilled user login", action.payload.data.data.user);
            state.user = action.payload.data.data.user;
            state.isLoading = false;
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            console.log(action.type)
            return state;
        })
        .addCase(authUser .rejected, (state, action) => {
            console.log("Is rejected  user login",action.payload); 
            state.isLoading = false;
        })
        .addCase(refreshToken.rejected, (state, action) => {
            console.log(action.type)
            return state;
        })
    }
})


// Handlers
// 1 Clear user data
export const { clearUser } = authSlice.actions;

// Reducer
export default authSlice.reducer;