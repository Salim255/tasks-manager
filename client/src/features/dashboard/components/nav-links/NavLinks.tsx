import { links } from '../../../../shared/utils/links';
import './_nav-links.scss';
import { NavLink } from "react-router-dom";
import { ProjectsLinks } from '../../../projects/components/products-link/ProjectsLink';
import { Fragment, useEffect } from 'react';
import {useSelectProjects} from "../../../projects/states/projectsSelectors";

export const NavLinks = ({ toggleSidebar }: { toggleSidebar: () => void}) => {
    const { projects } = useSelectProjects();
    
    useEffect(() => {
    },[projects])

    return  ( 
        <div className="nav-links">
            {
                links.map((link) => {
                const {id, text, path, icon} = link;
                return <Fragment key={id}>
                    <NavLink
                        onClick={toggleSidebar}
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
                    {   text==='Projects' && 
                        <ul>
                            {
                                projects.map((project) => {
                                    return(
                                        <ProjectsLinks key={project.id} project={project}/>
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