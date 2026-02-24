import { useState } from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { TaskItemProps } from "../task-item/TaskItem";

export const BoardTaskItem =  ({ task, ...props }: TaskItemProps) => {
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);
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
                <OptionsBtn 
                    item={task} 
                    isOptionsOpen={isOptionsOpen}
                    setOptionsOpen={setOptionsOpen}
                >
                    <ul className='options-list'>
                        <li className='options-list__item'>Edit Task</li>
                        <li className='options-list__item'>Delete Task</li>
                    </ul>
                </OptionsBtn>
            </section>
        </div>
    )
} 