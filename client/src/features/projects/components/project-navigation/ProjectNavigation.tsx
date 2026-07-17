import { projectLinks } from "../../../../shared/utils/links";
import { NavLink } from "react-router-dom";
import { ProjectActions } from "../project-header-action/ProjectHeaderAction";

export const ProjectNavigation = ({ projectKey, projectId }: { projectKey?: string, projectId: string }) => (
  <nav className="project-header__nav" aria-label="Project sections">
    {projectLinks.map((link) => (
      <NavLink
        key={link.id}
        to={projectKey ? link.path(projectKey) : "/workspaces"}
        className={({ isActive }) =>
          isActive
            ? "project-header__link project-header__link--active"
            : "project-header__link"
        }
      >
        <span className="project-header__link-icon">{link.icon}</span>
        <span className="project-header__link-text">{link.text}</span>
      </NavLink>
    ))}
    <ProjectActions projectId={projectId!} />
  </nav>
);
