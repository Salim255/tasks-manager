import { createSlice } from "@reduxjs/toolkit";

const editSprintSlice = createSlice({
    name: 'editSprint',
    initialState: {
        isOpen: false,
        sprintId: null,
    },
    reducers: {
        openEditSprint: (state, action) => {
            state.isOpen = true;
            state.sprintId = action.payload;
        },
        closeEditSprint: (state) => {
            state.isOpen = false;
            state.sprintId = null;
        }
    }
})


export const { openEditSprint, closeEditSprint } = editSprintSlice.actions;
export default editSprintSlice.reducer;