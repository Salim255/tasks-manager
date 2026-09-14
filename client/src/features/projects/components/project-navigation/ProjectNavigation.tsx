import { projectLinks } from "../../../../shared/utils/links";
import { NavLink } from "react-router-dom";
import { ProjectActions } from "../project-header-action/ProjectHeaderAction";
import "./_project-navigation.scss";

export const ProjectNavigation = ({
  projectKey,
  projectId,
}: {
  projectKey?: string;
  projectId: string;
}) => (
  <nav className="project-navigation" aria-label="Project sections">
    {projectLinks.map((link) => (
      <NavLink
        key={link.id}
        to={projectKey ? link.path(projectKey) : "/workspaces"}
        className={({ isActive }) =>
          isActive
            ? "project-navigation__link project-navigation__link--active"
            : "project-navigation__link"
        }
      >
        <span className="project-navigation__link-icon">
          {link.icon}
        </span>

        <span className="project-navigation__link-text">
          {link.text}
        </span>
      </NavLink>
    ))}

    <ProjectActions projectId={projectId} />
  </nav>
);