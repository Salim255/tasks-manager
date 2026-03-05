import './_board-task-item.scss';
import { useState } from "react";
import { IoCheckboxOutline } from "react-icons/io5";
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { TaskItemProps } from "../task-item/TaskItem";
import { GoPerson } from "react-icons/go";

export const BoardTaskItem =  ({ task, ...props }: TaskItemProps) => {
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);
    return (
        <div className="board-task-item" {...props} >
            <section className='board-task-item__content'>
                <div className='board-task-item__title'>
                    {task.title}  
                </div>
                <div className='board-task-item__actions'>
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
                </div>
            </section>
            <section className='board-task-item__footer'>
                <div className='board-task-item__checkbox'>
                    <IoCheckboxOutline className="board-task-item__checkbox-icon"/> <span> sprint name </span>
                </div>
                <div className='board-task-item__assignee'>
                    {/* {task.assigneeId} */}
                    <GoPerson/>
                </div>
            </section>
        </div>
    )
} 