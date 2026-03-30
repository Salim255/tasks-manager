import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
        name: 'memberSlice',
        initialState,
        reducers: {
            setMembers: (state, action: PayloadAction<{ members: Member[] }>) => {
                state.isLoading = true;
                const { members } = action.payload;
                console.log(members);
                state.members = members ?? [];
                state.isLoading = false;
            }
        }
    }
);

export const { setMembers } = memberSlice.actions;
export default memberSlice.reducer;
