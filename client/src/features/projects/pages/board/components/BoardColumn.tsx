import { DiScrum } from "react-icons/di";
import { BoardTaskItem } from "../../../components/board-task-item/BoardTaskItem";
import type { Task, TaskStatus } from "../../../models/task.model";
import { NavLink, useParams } from "react-router-dom";
import { type DragEvent } from "react";

export interface BoardColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDragStart: (e: DragEvent, task: Task) => void;
  onDrop: (e: DragEvent, status: TaskStatus) => void;
  onDragOver: (e: DragEvent) => void;
}

export const BoardColumn = ({
        title,
        status,
        tasks,
        onDragStart,
        onDrop,
        onDragOver
    }: BoardColumnProps,
    ) => {
  
    
    const { projectId }  = useParams<string>() ;
  /*   const countTasksByStatus = (status: TaskStatus): number | null => {
        const counter = tasks
            ?.filter(
                (task: Task) => 
                    task.status === status 
                    && (task.sprintId && activeSprintIds.has(task.sprintId))
            ).length || null;
        return counter ;
    }
 */
    return   <div className={`board-column ${status}`}
                onDrop={(e) => onDrop(e, status)}
                onDragOver={onDragOver}
            >
                <div className='todo__header'>
                    {title} { tasks.length }
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
                            to={`/projects/${projectId}/backlog`}>
                            Go to backlog
                        </NavLink>
                    </div>
                }
              
            </div>   
}