import "./_projects.scss";
import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useTaskViewerOpen } from "../tasks/states/taskSelectors";
import { TaskViewer } from "../tasks/components/task-viewer/TaskViewer";
import { QuickActionLayout } from "../../shared/components/quick-action-layout/QuickActionLayout";
import { QuickActionRenderer } from "./components/quick-action-renderer/QuickActionRenderer";
import { useActiveProject, useSelectProjects } from "./states/projectsSelectors";


export const Projects = () => {
    const isOpenTaskViewer = useTaskViewerOpen();
    const activeProject = useActiveProject();
    const projects = useSelectProjects();

  return (
   <>
    <div className="projects-layout">
  <section className="projects-layout__main">

    <div className="projects-layout__content">

      { activeProject?.id  && <ProjectNavbar /> }

      <div className="projects-layout__outlet">
        <div className="projects-layout__page">
          
          <Outlet />
        </div>
      </div>

    </div>


    <QuickActionLayout>
       <QuickActionRenderer/>
    </QuickActionLayout>

  </section>
</div>

    {isOpenTaskViewer && <TaskViewer />}
  </>
  );
}