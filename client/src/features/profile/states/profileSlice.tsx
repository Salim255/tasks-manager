import { createSlice } from "@reduxjs/toolkit";
import { createProfileHttp, getUserProfileHttp } from "../http/profileHttp";
import { type Profile } from "../model/profile.model";

type InitiateState = {
    profile?: Profile;
    isCreating: boolean;
    isLoading: boolean;
}

const initiateState: InitiateState = {
    isCreating: false,
    isLoading: false
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: initiateState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserProfileHttp.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(getUserProfileHttp.fulfilled, (state, action) => {
            const {profile} = action.payload.data;
            state.profile = profile;
            state.isLoading = false;
        })
        .addCase(getUserProfileHttp.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(createProfileHttp.pending, (state) => {
            state.isCreating = true;
        })
        .addCase(createProfileHttp.fulfilled, (state, action) => {
            const { profile } = action.payload.data;
            state.profile = profile;
            state.isCreating = false;
        })
        .addCase(createProfileHttp.rejected, (state) => {
            state.isCreating = false;
        })
    },

    } 
)

export default profileSlice.reducer;