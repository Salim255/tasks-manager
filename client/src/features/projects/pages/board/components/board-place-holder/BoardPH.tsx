import "./_board-ph.scss";
import { DiScrum } from "react-icons/di";
import { Link } from "react-router-dom";

export const  BoardPH = ({projectId}: {projectId: string} ) => {
    return (
        <div className='board-place-holder'>
           <div>
                <DiScrum />
                <h3 className="board-place-holder__title u-mb-md">
                    No Active Sprint
                </h3>
                <p className="u-mb-2xl">
                    Move tasks from your backlog into a sprint
                    to start tracking progress on your board.
                </p>
                <Link
                    className="btn btn--primary"
                    to={`/workspaces/${projectId}/backlog`}>
                    Go to backlog
                </Link>
           </div>
        </div>
    )
}