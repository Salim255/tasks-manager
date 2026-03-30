import './_projects-link.scss';
import { NavLink, useParams } from "react-router-dom";
import type { Project } from "../../models/project.model";
import { useDispatch } from "react-redux";
import { setActiveProjectId } from "../../states/projectSlice";
import { SiCloudflareworkers } from "react-icons/si";
import { type AppDispatch } from '../../../../redux/store';
import { fetchSingleProjectHttp } from '../../http/project.http';


export const ProjectsLinks = ({ project }: { project: Project }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams();

  const isCurrentProject = projectId === project.id;

  const updateActiveProjectId = async () => {
      dispatch(setActiveProjectId({ projectId: project.id }));
      dispatch(fetchSingleProjectHttp({projectId: project.id}));
  };
  
  return (
    <li className="projects-item">
    
      <SiCloudflareworkers 
        className={ isCurrentProject ? 
          "projects-item__icon projects-item__icon--active" 
          : "projects-item__icon"
        } />
      
      <NavLink
        onClick={updateActiveProjectId}
        className={ isCurrentProject 
          ? "projects-item__link projects-item__link--active" 
          : "projects-item__link"
        }
        to={`/dashboard/projects/${project.id}/board`} 
      >
        { project.name }
      </NavLink>
    </li>
  );
};