import { projectLinks } from '../../../../shared/utils/links';
import './_project-navbar.scss';
import { NavLink, useParams } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { useEffect } from 'react';



export const ProjectNavbar =() => {
    const {projects, activeProjectId} = useSelector((store:  RootState) => store.projectReducer);
    const { projectId } = useParams();
    const defaultProjectId =  projectId ; 
    useEffect(() => {}, [projects,  activeProjectId, defaultProjectId]);

    return (
        <header className="project-header">
            <div>
                Project name
            </div>
            <nav className="tasks-header__links">
                {
                    projectLinks.map((link) => {
                        return (
                             <NavLink
                                key={link.id}
                                to={link.path( projectId ?? '')}
                                className={({isActive}) => {
                                    return isActive ? "tasks-header__link tasks-header__link--active" : "tasks-header__link"
                                }} >
                                <span className='icon'>  { link.icon } </span>
                                {link.text}
                            </NavLink>
                        )
                     })
                }
            <RxDropdownMenu />
            </nav>
        </header>
    )
}