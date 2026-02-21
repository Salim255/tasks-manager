import { NavLink } from 'react-router-dom';
import './_board.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
export const Board = () => {

    const { sprints } = useSelector((store: RootState) => store.sprintReducer);
    useEffect(() => {}, [sprints]);

    return (
        <section className="board">
            <div className="board__todo">
                ToDO

                {
                    sprints.length 
                    ? sprints.map((sprint) => {
                        return <h1> { sprint.id }</h1>
                    })
                    : <div>
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
                }
              
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