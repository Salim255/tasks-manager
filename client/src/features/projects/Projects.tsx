import "./_projects.scss";
import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchProjectsHttp } from "./http/project.http";
import { useEffect } from "react";

export const Projects = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProjectsHttp());
    }, [dispatch]);

    return  (
        <div className="projects-layout">
            <ProjectNavbar />
            <div className="projects-content">
                <Outlet />
            </div>
        </div>    
    )
}