import { NavLink } from 'react-router-dom';
import './_board.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DiScrum } from "react-icons/di";
import type { Task, TaskStatus } from '../../models/task.model';
import { updateSprintSingleTaskStatus } from '../../states/sprintSlice';
import { selectActiveSprint } from '../../states/boardSlice';
import { BoardTaskItem } from '../../components/board-task-item/BoardTaskItem';

export const Board = () => {
    const dispatch = useDispatch();    
    const sprints = useSelector(selectActiveSprint);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
       // console.log(task);
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // any payload
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>, type: TaskStatus) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);
        console.log("dropped", type, task);
        dispatch(updateSprintSingleTaskStatus({task, status: type}));
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const countTasksByStatus = (status: TaskStatus): number | null => {
        const count = sprints?.reduce(
            (acc, sprint) => acc + sprint.tasks.filter(task => task.status === status).length, 0
        );
        return count || null;
    }

    useEffect(() => {}, [sprints]);

    return (
        <section className="board">
            <div className="todo"
                onDrop={(e) => onDrop(e, "todo")}
                onDragOver={onDragOver}
            >
                <div className='todo__header'>
                    To Do { countTasksByStatus("todo") }
                </div>

                {
                    sprints?.length 
                    ? sprints?.map((sprint) => {
                        
                        return <div key={sprint.id} className=''> 
                            {
                                sprint.tasks.map((task) => {
                                   return (
                                    task.status === "todo" ? 
                                    <BoardTaskItem 
                                        key={task.id} 
                                        task={task} 
                                        draggable
                                        onDragStart={(e) => onDragStart(e, task)}
                                         /> 
                                    : null
                                    )
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
                onDrop={(e) => onDrop(e, "in_progress")}
                onDragOver={onDragOver}
            >
                <div className='progress__header'>In Progress { countTasksByStatus("in_progress") }</div>
                {
                    sprints.length 
                    ? sprints.map((sprint) => {
                        return <div key={sprint.id} className=''>
                            {
                                sprint.tasks.map((task) => {
                                    return(
                                      task.status === "in_progress" ?
                                      <BoardTaskItem 
                                        task={task} 
                                        draggable
                                        onDragStart={(e) => onDragStart(e, task)}
                                        key={task.id} >
                                      </BoardTaskItem> 
                                      : null
                                    )
                                })
                            }
                        </div>
                    })
                    : null
                }
            </div>
            <div className="done"
                onDrop={(e) => onDrop(e, "done")}
                onDragOver={onDragOver}
            >
               <div className='done__header'> Done { countTasksByStatus("done") } </div>
                {   sprints.length 
                    ? sprints.map((sprint) => {
                        return <div key={sprint.id} className=''>
                            {
                                sprint.tasks.map((task) => {
                                    return (
                                        task.status === "done" ?
                                        <BoardTaskItem 
                                        task={task}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, task)}
                                        key={task.id}>
                                        </BoardTaskItem> 
                                        : null
                                    )
                                })
                            }
                        </div>
                    })
                    : null
                }
            </div>
        </section>
    )
}