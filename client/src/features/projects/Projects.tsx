import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchProjects } from "./states/projectSlice";

export const Projects = () => {
    const dispatch = useDispatch<AppDispatch>();

    dispatch(fetchProjects())
    return <>
        <ProjectNavbar/>
        <Outlet></Outlet>
    </>
}