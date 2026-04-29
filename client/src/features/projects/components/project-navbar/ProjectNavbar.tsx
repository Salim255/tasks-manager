import { projectLinks } from '../../../../shared/utils/links';
import './_project-navbar.scss';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
import { IoMdOptions } from "react-icons/io";
import { AddMemberForm } from '../add-member-form/AddMemberForm';

export const ProjectNavbar =() => {
    const { activeProject, isFetchingProject} = useSelector((store:  RootState) => store.projectReducer);

    const projectId  = activeProject?.id;
    
     useEffect(() => {
    }, [activeProject, isFetchingProject]);

    return (
        <header className="project-header">
            <div className='project-header__title'>
                <h2> {activeProject?.name} </h2>
                <div>
                    <AddMemberForm projectId={projectId!} />
                </div>
            </div>
            <nav className="project-header__links">
                {
                    projectLinks.map((link) => {
                        return (
                             <NavLink
                                key={link.id}
                                to={link.path( projectId ?? '')}
                                className={({isActive}) => {
                                    return isActive ? "project-header__link project-header__link--active" : "project-header__link"
                                }} >
                                <span className='icon'>  { link.icon } </span>
                                {link.text}
                            </NavLink>
                        )
                     })
                }

                <button className='project-header__options'>
                   <IoMdOptions className='icon' />
                </button>
            </nav>
        </header>
    )
}