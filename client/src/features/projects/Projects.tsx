import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchProjectsHttp } from "./http/project.http";

export const Projects = () => {
    const dispatch = useDispatch<AppDispatch>();

    dispatch(fetchProjectsHttp())
    return <>
        <ProjectNavbar/>
        <Outlet></Outlet>
    </>
}