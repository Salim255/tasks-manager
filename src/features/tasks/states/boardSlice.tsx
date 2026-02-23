import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sprint } from "../model/sprint.model";

type BoardInitialStateType = {
    sprints: Sprint[];
    isLoading: boolean;
}

const initialState: BoardInitialStateType = {
    sprints: [],
    isLoading: false
}

const boardSlice = createSlice({
    name: "board",
    initialState: initialState,
    reducers: {
        addSprintToBoard: (state, action: PayloadAction<{sprint: Sprint}>) => {
            const { sprint } = action.payload;
            state.sprints.push(sprint);
        }
    }
});

export const { addSprintToBoard } = boardSlice.actions;
export default boardSlice.reducer;