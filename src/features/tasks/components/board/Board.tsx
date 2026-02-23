import { NavLink } from 'react-router-dom';
import './_board.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
import { DiScrum } from "react-icons/di";
import type { Task } from '../../model/task.model';

export const Board = () => {

    const { sprints } = useSelector((store: RootState) => store.sprintReducer);

    const onDragStart = (task: Task) => {
        console.log(task);
    }
    const onDop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log("dropped");
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    useEffect(() => {}, [sprints]);

    return (
        <section className="board">
            <div className="todo">
                <div className='todo__header'>
                    To Do
                </div>

                {
                    sprints.length 
                    ? sprints.map((sprint) => {
                        return <div key={sprint.id} className=''> 
                            {
                                sprint.tasks.map((task) => {
                                    return <div 
                                        draggable
                                        onDragStart={ onDragStart.bind(this, task) }
                                        key={task.id} className='todo__task'>
                                        {task.title}
                                    </div>
                                })
                            }
                        </div>
                    })
                    : <div className='todo__empty'>
                        <DiScrum className='icon'/>
                        <h3>
                            Get started in backlog
                        </h3>
                        <p>
                            Plan and star a sprint to see work here
                        </p>
                        <NavLink 
                            className="btn btn--primary"
                            to={"/tasks/backlog"}>
                            Go to backlog
                        </NavLink>
                    </div>
                }
              
            </div>
            <div className="progress"
                onDrop={onDop}
                onDragOver={onDragOver}
            >
                <div className='progress__header'>In Progress</div>
            </div>
            <div className="done"
                onDrop={onDop}
                onDragOver={onDragOver}
            >
               <div className='done__header'> Done </div>
            </div>
        </section>
    )
}