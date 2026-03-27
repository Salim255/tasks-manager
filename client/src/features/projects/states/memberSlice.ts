import { createSlice } from "@reduxjs/toolkit";
import type { Member } from "../models/member.model";


type InitialState = {
    members: Member[];
    isLoading: boolean;
}

const initialState:  InitialState = {
    members: [],
    isLoading: false,
}

const memberSlice = createSlice(
    {
        name: '',
        initialState,
        reducers: {
            setProjectMembers: (state, action) => {
                state.isLoading = true;
                const {members} = action.payload;
                state.members = members ?? [];
                state.isLoading = false;

            }
        }
    }
);

export const { setProjectMembers } = memberSlice.actions;
export default memberSlice.reducer;
