import { DiScrum } from "react-icons/di";
import { BoardTaskItem } from "../../../components/board-task-item/BoardTaskItem";
import type { Sprint } from "../../../models/sprint.model";
import type { Task, TaskStatus } from "../../../models/task.model";
import { NavLink, useParams } from "react-router-dom";
import { useMemo, type DragEvent } from "react";

export interface BoardColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  sprints: Sprint [];
  onDragStart: (e: DragEvent, task: Task) => void;
  onDrop: (e: DragEvent, status: TaskStatus) => void;
  onDragOver: (e: DragEvent) => void;
}

export const BoardColumn = ({
        title,
        status,
        sprints,
        tasks,
        onDragStart,
        onDrop,
        onDragOver
    }: BoardColumnProps,
    ) => {
    const activeSprintIds = useMemo(() => {
            return new Set(sprints
                .filter((sprint) => sprint.status === 'active')
                .map((sprint) => sprint.id)
            );
        }, [sprints]);
    
    const { projectId }  = useParams<string>() ;
    const countTasksByStatus = (status: TaskStatus): number | null => {
        const counter = tasks
            ?.filter(
                (task: Task) => 
                    task.status === status 
                    && (task.sprintId && activeSprintIds.has(task.sprintId))
            ).length || null;
        return counter ;
    }
    
    return   <div className={`board-column ${status}`}
                onDrop={(e) => onDrop(e, status)}
                onDragOver={onDragOver}
            >
                <div className='todo__header'>
                    {title} { countTasksByStatus(status) }
                </div>

                {
                    sprints
                    ?.filter(
                        (spt: Sprint) => spt.status === 'active'
                    )?.length 
                    ? 
                        sprints.
                        filter((sprint) => sprint.status === 'active')
                        .map((sprint) => {
                            
                            return <div key={sprint.id} > 
                                {
                                    tasks.map((task: Task) => {
                                    return (
                                        (
                                            task.status === status
                                            && 
                                            task.sprintId === sprint.id
                                        ) 
                                        &&
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
                            to={`/projects/${projectId}/backlog`}>
                            Go to backlog
                        </NavLink>
                    </div>
                }
              
            </div>   
}