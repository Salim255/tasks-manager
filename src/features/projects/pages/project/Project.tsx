import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "../../components/project-navbar/ProjectNavbar";

export const Project = () => {
    return <>
        <ProjectNavbar/>
        <Outlet></Outlet>
    </>
}