import "./_projects.scss";
import { Outlet, useParams } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useTaskViewerOpen } from "../tasks/states/taskSelectors";
import { TaskViewer } from "../tasks/components/task-viewer/TaskViewer";


export const Projects = () => {
    const isOpenTaskViewer = useTaskViewerOpen();
    const { projectId } = useParams();
  
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