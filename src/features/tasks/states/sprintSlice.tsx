// 1 http

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Sprint } from "../model/sprint.model";

// 2 intial state
type StateType  = {
    sprints: Sprint[];
    isLoading: false 
}
const initialState: StateType = {
    sprints: [],
    isLoading: false
};
// 3 create slice
const createSprintSlice = createSlice({
    name: 'sprintSlice',
    initialState,
    reducers: {
        addSprint: (state, action: PayloadAction<Sprint> ) => {
            state.sprints = [...state.sprints , action.payload]
        }
    },

})

// Export other reducers
export const { addSprint} = createSprintSlice.actions;
//  Export reducer
export default createSprintSlice.reducer;