import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sprint } from "../model/sprint.model";

type InitialState = {
    isOpen: boolean;
    sprint?: Sprint;
};

const initialState: InitialState = {
    isOpen: false
};

const editSprintSlice = createSlice({
    name: 'editSprint',
    initialState,
    reducers: {
        openEditSprint: (state, action:  PayloadAction<{ sprint: Sprint }>) => {
            const { sprint } = action.payload;
            console.log(sprint, "hello from open edit sprint");
            state.isOpen = true;
            state.sprint = sprint;
        },
        closeEditSprint: (state) => {
            state.isOpen = false;
            state.sprint = undefined;
        }
    }
})


export const { openEditSprint, closeEditSprint } = editSprintSlice.actions;
export default editSprintSlice.reducer;