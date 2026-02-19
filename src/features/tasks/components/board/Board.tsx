import { NavLink } from 'react-router-dom';
import './_board.scss';
export const Board = () => {
    return (
        <section className="board">
            <div className="board__todo">
                ToDO
                <h1>
                    Get started in backlog
                </h1>
                <div>
                    <p>
                        Plan and star a sprint to see work here
                    </p>
                </div>

                <NavLink to={"/tasks/backlog"}>
                    Go to backlog
                </NavLink>
            </div>
            <div className="board__progress">
                inprogress
            </div>
            <div className="board__done">
                Done
            </div>
        </section>
    )
}