import type { AppDispatch } from "../../../redux/store";
import { clearProfile } from "../../profile/states/profileSlice";
import { clearProjects } from "../../projects/states/projectSlice";
import { clearTasks } from "../../tasks/states/taskSlice";
import { logoutHttp } from "../http/auth.http";

export const logout = (dispatch: AppDispatch) => {
    dispatch(logoutHttp({}));
    dispatch(clearProfile());
    dispatch(clearTasks()); // if needed
    dispatch(clearProjects()); // if needed
};