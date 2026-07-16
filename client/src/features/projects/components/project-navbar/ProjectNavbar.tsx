import "./_project-navbar.scss";
import { useActiveProject, useIsLoadingActiveProject } from "../../states/projectsSelectors";
import { ProjectIdentity } from "../project-identity/ProjectIdentity";
import { ProjectActions } from "../project-header-action/ProjectHeaderAction";
import { ProjectNavigation } from "../project-navigation/ProjectNavigation";
import { ProjectNavbarSkeleton } from "../../skeletons/ProjectNavbarSkeleton";

export const ProjectNavbar = () => {
  const activeProject = useActiveProject();
  const isLoading = useIsLoadingActiveProject();

  if (isLoading || !activeProject) {
    return <ProjectNavbarSkeleton />
  }
  
  return (
    <header className="project-header">
      <div className="project-header__top">
        <ProjectIdentity projectKey={activeProject?.key} projectName={activeProject?.name}/>
        <ProjectActions projectId={activeProject?.id} />
      </div>

      <div className="project-header__bottom">
        <ProjectNavigation projectKey={activeProject?.key}/>
      </div>
    </header>
  );
};