import "./_projects.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useTaskViewerOpen } from "../tasks/states/taskSelectors";
import { TaskViewer } from "../tasks/components/task-viewer/TaskViewer";
import { QuickActionLayout } from "../../shared/components/quick-action-layout/QuickActionLayout";
import { QuickActionRenderer } from "./components/quick-action-renderer/QuickActionRenderer";
import {
  useActiveProject,
  useSelectProjects,
} from "./states/projectsSelectors";
import type { AppDispatch } from "../../redux/store";
import { setActiveProject } from "./states/projectSlice";
import { EmptyProjects } from "./pages/empty-projects/EmptyProjects";
import { fetchSingleProjectHttp } from "./http/project.http";


export const Projects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isOpenTaskViewer = useTaskViewerOpen();
  const activeProject = useActiveProject();
  const projects = useSelectProjects();

  const hasProjects = projects.length > 0;

  useEffect(() => {
    // no project at all -> stay on empty workspace page
    if (!hasProjects) return;

   // projects exist but no active project -> bootstrap first project
    if (!activeProject) {
      const firstProject = projects[0];

      //dispatch(setActiveProject({ projectId: firstProject.id }));
      //dispatch(fetchSingleProjectHttp({ projectId: firstProject.id }));
      navigate(`/workspaces/${firstProject.key}/board`, { replace: true });
      return;
    }

    //dispatch(fetchSingleProjectHttp({ projectId: activeProject.id }));
    navigate(`/workspaces/${activeProject.key}/board`, { replace: true });
    
  }, [dispatch]);
  console.log("Hello from redernder", activeProject)

  const shouldShowEmptyProjects = !activeProject && !hasProjects;

  return (
    <>
      <div className="projects-layout">
        <section className="projects-layout__main">
          <div className="projects-layout__content">
            {
                shouldShowEmptyProjects ? <EmptyProjects />:
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

          <QuickActionLayout>
            <QuickActionRenderer />
          </QuickActionLayout>
        </section>
      </div>

      {isOpenTaskViewer && <TaskViewer />}
    </>
  );
};