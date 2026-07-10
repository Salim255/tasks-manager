import { projectLinks } from "../../../../shared/utils/links";
import "./_project-navbar.scss";
import { NavLink } from "react-router-dom";
import { IoMdOptions } from "react-icons/io";
import { AddMemberForm } from "../../../members/components/add-member-form/AddMemberForm";
import { useActiveProject } from "../../states/projectsSelectors";

export const ProjectNavbar = () => {
  const activeProject = useActiveProject();

  const projectId = activeProject?.id;
  const projectKey = activeProject?.key;


  
  return (
    <header className="project-header">
      <div className="project-header__top">
        <div className="project-header__identity">
          <span className="project-header__eyebrow">
            { projectKey }
          </span>

          <div className="project-header__title-row">
            <h2 className="project-header__title">
              {activeProject?.name ?? "Project workspace"}
            </h2>
          </div>
        </div>

        <div className="project-header__actions">
          {projectId && <AddMemberForm projectId={projectId} />}
        </div>
      </div>

      <div className="project-header__bottom">
        <nav className="project-header__nav" aria-label="Project sections">
          {projectLinks.map((link) => {
            return (
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
            );
          })}
        </nav>

        <button
          type="button"
          className="project-header__options"
          aria-label="Project options"
        >
          <IoMdOptions className="icon" />
        </button>
      </div>
    </header>
  );
};