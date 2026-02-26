import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../models/project.model";

type InitialState = {
    projects: Project[];
    isLoading: boolean;
}

// Initial state 
const initialState: InitialState = {
    projects: [],
    isLoading: false,
}

// 

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {}
});

export default projectSlice.reducer;
