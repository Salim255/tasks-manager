import "./_projects-link.scss";
import { NavLink, useParams } from "react-router-dom";
import type { Project } from "../../models/project.model";
import { useDispatch } from "react-redux";
import { setActiveProjectId } from "../../states/projectSlice";
import { SiCloudflareworkers } from "react-icons/si";
import { type AppDispatch } from "../../../../redux/store";
import { fetchSingleProjectHttp } from "../../http/project.http";

export const ProjectsLinks = ({ project }: { project: Project }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams();

  const isCurrentProject = projectId === project?.key;

  const updateActiveProjectId = () => {
    dispatch(setActiveProjectId({ projectId: project.id }));
    dispatch(fetchSingleProjectHttp({ projectId: project.id }));
  };

  return (
    <li className="projects-item">
      <NavLink
        onClick={updateActiveProjectId}
        className={
          isCurrentProject
            ? "projects-item__link projects-item__link--active"
            : "projects-item__link"
        }
        to={`/workspaces/${project.key}/board`}
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