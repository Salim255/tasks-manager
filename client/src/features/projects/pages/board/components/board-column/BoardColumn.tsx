import "./_board-column.scss";
import { BoardTaskItem } from "../board-task-item/BoardTaskItem";
import type { Task, TaskStatus } from "../../../../models/task.model";
import { useParams } from "react-router-dom";
import { type DragEvent } from "react";
import { BoardPH } from "../board-place-holder/BoardPH";

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

    const { projectId }  = useParams<string>();

    return (
        <div 
            className={`board-column ${status}`}
            onDrop={(e) => onDrop(e, status)}
            onDragOver={onDragOver}
        >
            <div className='todo__header'>
                { title } { tasks.length > 0 ? tasks.length: null }
            </div>

            {
                tasks?.length 
                ?   
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
                : (status === 'todo' && sprintsSize === 0) 
                    &&  
                    <BoardPH projectId={projectId!} />                      
            }
        </div>  
    ) 
}