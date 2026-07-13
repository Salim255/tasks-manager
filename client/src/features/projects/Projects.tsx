import "./_projects.scss";
import { Outlet } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { TaskViewer } from "../tasks/components/task-viewer/TaskViewer";
import { QuickActionLayout } from "../../shared/components/quick-action-layout/QuickActionLayout";
import { useSelectProjects } from "./states/projectsSelectors";
import { EmptyProjects } from "./pages/empty-projects/EmptyProjects";
import { useQuickActionIsOpen } from "../../shared/modals/states/quickActionsSelectors";

export const Projects = () => {
  const projects = useSelectProjects();
  const quickActionIsOpen = useQuickActionIsOpen();
  const hasProjects = projects?.length > 0;
  
  return (
    <>
      <div className="projects-layout">
        <section className="projects-layout__main">
          <div className="projects-layout__content">
            {
                !hasProjects ? <EmptyProjects />:
                <>
                    <ProjectNavbar />

                    <div className="projects-layout__outlet">
                      <div className="projects-layout__page">
                        <Outlet />
                      </div>
                    </div>
                </>
            }
          </div>

          { 
            quickActionIsOpen 
            && <QuickActionLayout>
                <TaskViewer />
            </QuickActionLayout> 
          }
        </section>
      </div>
    </>
  );
};