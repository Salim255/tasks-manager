import { DiScrum } from "react-icons/di";
import { NavLink } from "react-router-dom";

export const  BoardPH = ({projectId}: {projectId: string} ) => {
    return (
        <div className='todo__empty'>
            <DiScrum className='icon'/>
            <h3>
                Get started in backlog
            </h3>
            <p>
                Plan and star a sprint to see work here
            </p>
            <NavLink 
                className="btn btn--primary"
                to={`/projects/${projectId}/backlog`}>
                Go to backlog
            </NavLink>
        </div>
    )
}