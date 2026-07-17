import { links } from '../../../../shared/utils/links';
import './_nav-links.scss';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ProjectsLinks } from '../../../projects/components/products-link/ProjectsLink';
import { Fragment, useEffect, useState } from 'react';
import { useActiveProject, useIsLoadingProjects, useSelectProjects} from "../../../projects/states/projectsSelectors";
import { setActiveProject } from '../../../projects/states/projectSlice';
import { fetchSingleProjectHttp } from '../../../projects/http/project.http';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../../../redux/store';
import { NavbarSkeleton } from '../../skeletons/NavbarSkeleton';


export const NavLinks = ({ toggleSidebar }: { toggleSidebar?: () => void}) => {
    const projects  = useSelectProjects();
    const isLoadingProjects = useIsLoadingProjects();
    const activeProject = useActiveProject();
    const navigate = useNavigate();
    const  dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    const [toggleProjects, setToggleProjects] = useState<boolean>(false);

    const handleClick = (text: string) => {
        if(text === 'workspaces') {
             // If projects and no active project
            // we go to project in index 0
            if (!activeProject && projects?.length) {
                const firstProject = projects[0];
                dispatch(setActiveProject({ projectId: firstProject.id }));
                dispatch(fetchSingleProjectHttp({ projectId: firstProject.id }));
            }

            // If there are current project do me this
            if (activeProject?.key) {
                queueMicrotask(() => {
                    navigate(`/workspaces/${activeProject?.key}/board`, { replace: true });
                });
            }

            setToggleProjects((prev) => !prev);
        }
        // To run on small bar
        if (toggleSidebar) toggleSidebar();
    }

    useEffect(() => {
        if (!activeProject?.key) return;

        const targetPath = `/workspaces/${activeProject.key}/board`;
        if (location.pathname !== targetPath) {
            navigate(targetPath, { replace: true });
        }
    }, [activeProject])

    return  ( 
        <div className="nav-links u-p-xl">
          
            {isLoadingProjects
                ? <NavbarSkeleton />
                :
                links.map((link) => {
                const {id, text, path, icon} = link;
                return <Fragment key={id}>
                    <NavLink
                        onClick={() => handleClick(text)}
                        to={path}
                        className={({isActive}) => {
                            return isActive ? 
                            'nav-links__nav-link  nav-links__nav-link--active'
                            : 'nav-links__nav-link'
                        }}
                        >
                        <span className='icon'>  { icon } </span>
                        { text }
                    </NavLink>
                    {   text==='workspaces' && 
                       
                        <ul key={id}  className={`nav-links__projects scroll-bar ${toggleProjects ? 'nav-links__projects--active': ''} `}>
                            {
                                projects?.map((project) => {
                                    return(
                                        <ProjectsLinks key={project?.key} project={project}/>
                                    )
                                })
                            }
                        </ul>
                       
                    }
                </Fragment>
            })
            }
        </div>
    )
}