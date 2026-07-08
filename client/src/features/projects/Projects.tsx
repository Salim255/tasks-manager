import "./_projects.scss";
import { Outlet, useParams } from "react-router-dom";
import { ProjectNavbar } from "./components/project-navbar/ProjectNavbar";
import { useTaskViewerOpen } from "../tasks/states/taskSelectors";
import { TaskViewer } from "../tasks/components/task-viewer/TaskViewer";
import { QuickActionLayout } from "../../shared/components/quick-action-layout/QuickActionLayout";
import { useQuickActionIsOpen } from "../../shared/modals/states/quickActionsSelectors";

export const Projects = () => {
    const isOpenTaskViewer = useTaskViewerOpen();
    const isQuickActionOpen = useQuickActionIsOpen();

    const { projectId } = useParams();


  return (
   <>
    <div className="projects-layout">
  <section className="projects-layout__main">

    <div className="projects-layout__content">

      {projectId && <ProjectNavbar />}

      <div className="projects-layout__outlet">
        <div className="projects-layout__page">
          <Outlet />
        </div>
      </div>

    </div>


    <QuickActionLayout isOpen={isQuickActionOpen}>
      <div>Hello world Salim</div>
    </QuickActionLayout>


  </section>
</div>

    {isOpenTaskViewer && <TaskViewer />}
  </>
  );
}