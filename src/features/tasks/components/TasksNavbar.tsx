import { NavLink } from "react-router-dom";
import { tasksLinks } from "../../../shared/utils/links";

export const TasksNavbar =() => {
    return (
        <header>
            <nav>
                {
                    tasksLinks.map((link) => {
                        return (
                             <NavLink to={link.path} >
                                {link.text}
                            </NavLink>
                        )
                     })
                }
               
            </nav>
        </header>
    )
}