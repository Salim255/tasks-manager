import { NavLink } from "react-router-dom";
import type { Project } from "../../models/project.model";
import { useDispatch } from "react-redux";
import { setActiveProductId } from "../../states/projectSlice";

export const ProductsLinks = ({ project }:{ project: Project}) => {
    const dispatch = useDispatch();
    const updateActiveProjectId = () => {
        dispatch(setActiveProductId({projectId: project.id }));
    }

    return <>
         <li>
            <NavLink
                onClick={updateActiveProjectId}
                className={({isActive}) => {
                    return  isActive  ? 'test1' : 'test2'
                }}
                to={`/projects/${project.id}/board`}
             
                >
                {project.name}
            </NavLink>
        </li>
    </>

}