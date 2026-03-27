import { projectLinks } from '../../../../shared/utils/links';
import './_project-navbar.scss';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
import { IoMdOptions } from "react-icons/io";
import { AddMemberForm } from '../add-member-form/AddMemberForm';

export const ProjectNavbar =() => {
    const { activeProject} = useSelector((store:  RootState) => store.projectReducer);
    const { id: projectId } = activeProject!;
 
    useEffect(() => {
    }, [activeProject]);

    return (
        <header className="project-header">
            <h2 className='project-header__title'>
                { activeProject?.name } <AddMemberForm projectId={projectId} />
            </h2>
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