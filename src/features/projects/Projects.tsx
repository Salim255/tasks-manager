import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";

export const Projects = () => {
    return <>
        <ProjectNavbar/>
        <Outlet></Outlet>
    </>
}