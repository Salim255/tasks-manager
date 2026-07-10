import "./_projects-link.scss";
import { NavLink } from "react-router-dom";
import type { Project } from "../../models/project.model";
import { useDispatch } from "react-redux";
import { setActiveProject } from "../../states/projectSlice";
import { SiCloudflareworkers } from "react-icons/si";
import { type AppDispatch } from "../../../../redux/store";
import { fetchSingleProjectHttp } from "../../http/project.http";
import { useActiveProject } from "../../states/projectsSelectors";

export const ProjectsLinks = ({ project }: { project: Project }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeProject = useActiveProject();

  const isCurrentProject = activeProject?.key === project?.key;

  const updateActiveProjectId = () => {
    if (!project) return;
    dispatch(setActiveProject({ projectId: project.id }));
    dispatch(fetchSingleProjectHttp({ projectId: project.id }));
  };

  const destination = project
    ? `/workspaces/${project?.key}/board`
    : "/workspaces";

  return (
    <li className="projects-item">
      <NavLink
        onClick={updateActiveProjectId}
        className={
          isCurrentProject
            ? "projects-item__link projects-item__link--active"
            : "projects-item__link"
        }
        to={destination}
      >
        <span className="projects-item__badge">
          <SiCloudflareworkers className="projects-item__icon" />
        </span>

        <span className="projects-item__content">
          <span className="projects-item__name">{project.name}</span>
          <span className="projects-item__key">{project.key}</span>
        </span>
      </NavLink>
    </li>
  );
};