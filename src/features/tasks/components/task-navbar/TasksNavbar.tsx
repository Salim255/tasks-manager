import './_task-navbar.scss';
import { NavLink } from "react-router-dom";
import { tasksLinks } from "../../../../shared/utils/links";

export const TasksNavbar =() => {
    return (
        <header className="tasks-header">
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