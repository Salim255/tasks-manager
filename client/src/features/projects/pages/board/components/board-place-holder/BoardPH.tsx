import "./_board-ph.scss";
import { DiScrum } from "react-icons/di";
import { NavLink } from "react-router-dom";

export const  BoardPH = ({projectId}: {projectId: string} ) => {
    return (
        <div className='board-place-holder'>
            <DiScrum />
            <h3>
                No Active Sprint
            </h3>
            <p>
                Move tasks from your backlog into a sprint
                to start tracking progress on your board.
            </p>
            <NavLink 
                to={`/workspaces/${projectId}/backlog`}>
                Go to backlog
            </NavLink>
        </div>
    )
}