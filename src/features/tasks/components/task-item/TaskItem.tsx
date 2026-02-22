import './_task-item.scss';
import type { Task } from "../../model/task.model";
import { IoCheckboxOutline } from 'react-icons/io5';
import { SlOptions } from "react-icons/sl";

type TaskItemProps = { task: Task; } & React.HTMLAttributes<HTMLDivElement>; // <-- this is the magic

export const TaskItem =  ({ task, ...props }: TaskItemProps) => {
    return (
        <div className="task-item" {...props} >
            <section className='task-item__content'>
                <div className='task-item__checkbox'>
                    <IoCheckboxOutline/>
                </div>
                <div className='task-item__title'>
                    {task.title}  
                </div>
            </section>
            <section className='task-item__status'>
                {task.status}
            </section>
            <section className='task-item__assignee'>
                {task.assigneeId}
            </section>
            <section className='task-item__actions'>
                <SlOptions/>
            </section>
        </div>
    )
} 