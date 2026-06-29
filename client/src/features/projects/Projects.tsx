import "./_projects.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../redux/store";
import { useTaskViewerOpen } from "../tasks/states/taskSelectors";
import { TaskViewer } from "../tasks/components/task-viewer/TaskViewer";

export const Projects = () => {
     const isOpenTaskViewer = useTaskViewerOpen();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const {projects, isLoading } = useSelector((store:  RootState) => store.projectReducer);
    
    useEffect(() => {
        if (!isLoading && !projects.length){
            navigate("/dashboard/create-project", { replace: true });
            return;
        }       
    }, [projects, navigate, isLoading]);

    return  (
       <>
        <div 
            className="projects-layout">
            <section className="projects-layout__main">
                { projectId && <ProjectNavbar /> }
                <div className="projects-layout__outlet">
                    <Outlet />
                </div>
            </section>
        </div>

        { isOpenTaskViewer &&  <TaskViewer/>}
       </>
    )
}