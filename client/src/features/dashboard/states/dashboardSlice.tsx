import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSideBarIsOpen: false
}
const dashboardSlice  = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateSidebarOpenState: (state)=> {
           state.isSideBarIsOpen = !state.isSideBarIsOpen;
        }
    },
})

// Handlers
// 1 Clear user data
export const { updateSidebarOpenState } = dashboardSlice.actions;
export default dashboardSlice.reducer;