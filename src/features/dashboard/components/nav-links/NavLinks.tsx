import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { links } from '../../../../shared/utils/links';
import './_nav-links.scss';

import { NavLink } from "react-router-dom";
import { useEffect } from 'react';


export const NavLinks = ({ toggleSidebar }: { toggleSidebar: () => void}) => {
    const { projects } = useSelector((store:  RootState) => store.projectReducer);

    useEffect(() => {},[projects]);

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
                        return isActive ? 
                        'nav-links__nav-link  nav-links__nav-link--active'
                        : 'nav-links__nav-link'
                    }}
                    >
                     
                            <div className='parent-link'>
                                <span className='icon'>  { icon } </span>
                                { text }
                            </div>
                    
                       {
                        text==='Projects' &&  <ul>
                           {
                            projects.map((project) => {
                                return(
                                    <li><NavLink 
                                        className={({isActive}) => {
                                            return  isActive  ? 'test1' : 'test2'
                                        }}
                                        to={`/projects/${project.id}/board`}
                                        end
                                        >
                                            {project.name}
                                        </NavLink>
                                    </li>
                                )
                            })
                           }
                        </ul>
                       }
                </NavLink>
            })
            }
        </div>
    )
}