import { projectLinks } from "../../../../shared/utils/links";
import { NavLink } from "react-router-dom";

export const ProjectNavigation = ({ projectKey }: { projectKey?: string }) => (
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
  </nav>
);
