import type { AppDispatch } from "../../../redux/store";
import { clearProfile } from "../../profile/states/profileSlice";
import { clearProjects } from "../../projects/states/projectSlice";
import { clearTasks } from "../../projects/states/taskSlice";
import { clearUser } from "./authSlice";

export const logout = (dispatch: AppDispatch) => {
    dispatch(clearUser());
    dispatch(clearProfile());
    dispatch(clearTasks()); // if needed
    dispatch(clearProjects()); // if needed
};