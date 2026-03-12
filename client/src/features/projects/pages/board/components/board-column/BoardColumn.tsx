import "./_board-column.scss";
import { DiScrum } from "react-icons/di";
import { BoardTaskItem } from "../board-task-item/BoardTaskItem";
import type { Task, TaskStatus } from "../../../../models/task.model";
import { NavLink, useParams } from "react-router-dom";
import { type DragEvent } from "react";

export interface BoardColumnProps {
  title: string;
  status: TaskStatus;
  sprintsSize: number;
  tasks: Task[];
  onDragStart: (e: DragEvent, task: Task) => void;
  onDrop: (e: DragEvent, status: TaskStatus) => void;
  onDragOver: (e: DragEvent) => void;
}

export const BoardColumn = ({
        title,
        status,
        tasks,
        sprintsSize,
        onDragStart,
        onDrop,
        onDragOver
    }: BoardColumnProps,
    ) => {
  
    
    const { projectId }  = useParams<string>() ;
    return   <div className={`board-column ${status}`}
                onDrop={(e) => onDrop(e, status)}
                onDragOver={onDragOver}
            >
                <div className='todo__header'>
                    {title} { tasks.length > 0 ? sprintsSize : null }
                </div>

                {
                    tasks.length 
                    ? 
                        <div> 
                            {
                                tasks.map((task: Task) => {
                                return (
                                    <BoardTaskItem 
                                        key={task.id} 
                                        task={task} 
                                        draggable
                                        onDragStart={(e) => onDragStart(e, task)}
                                        /> 
                                    )
                                })
                            }
                        </div>
                        
                    : 
                    <>
                        {
                            (status === 'todo' && sprintsSize === 0) ? 
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
                            </div> : null
                        }
                    </>
                }
              
            </div>   
}