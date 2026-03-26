import "./_projects.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../redux/store";

export const Projects = () => {
    const navigate = useNavigate();
    const {projects, isLoading } = useSelector((store:  RootState) => store.projectReducer);
    
    console.log(projects);
    useEffect(() => {
        if (!isLoading && !projects.length){
            navigate("/create-project", { replace: true });
            return;
        }       
    }, [projects, navigate, isLoading]);

    return  (
        <div className="projects-layout">
            <ProjectNavbar />
            <div className="projects-content">
                <Outlet />
            </div>
        </div>    
    )
}