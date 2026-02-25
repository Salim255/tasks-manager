import { tasksLinks } from '../../../../shared/utils/links';
import './_project-navbar.scss';
import { NavLink } from "react-router-dom";


export const ProjectNavbar =() => {
    return (
        <header className="project-header">
            <div>
                Project name
            </div>
            <nav className="tasks-header__links">
                {
                    tasksLinks.map((link) => {
                        return (
                             <NavLink
                                key={link.id} 
                                to={link.path}
                                className={({isActive}) => {
                                    return isActive ? "tasks-header__link tasks-header__link--active" : "tasks-header__link"
                                }} >
                                <span className='icon'>  { link.icon } </span>
                                {link.text}
                            </NavLink>
                        )
                     })
                }
               
            </nav>
        </header>
    )
}