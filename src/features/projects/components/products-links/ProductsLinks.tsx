import { NavLink } from "react-router-dom";
import type { Project } from "../../models/project.model";

export const ProductsLinks = ({ project }:{ project: Project}) => {
    return <>
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
    </>

}