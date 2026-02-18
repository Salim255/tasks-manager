//import './_nav-links.scss';

import { NavLink } from "react-router-dom";
import { links } from "../../../shared/utils/links";

export const NavLinks = ({ toggleSidebar }: { toggleSidebar: () => void}) => {
    
    return  ( 
        <div className="nav-links">
            {
                links.map((link) => {
                const {id, text, path, icon} = link;
                return <NavLink
                    onClick={toggleSidebar}
                    key={id}
                    to={path}
                    className={({isActive}) => {
                        return isActive ? 'nav-link  active': 'nav-link '
                    }}
                    >
                        <span className='icon'>  { icon } </span>
                        { text }
                </NavLink>
            })
            }
        </div>
    )
}