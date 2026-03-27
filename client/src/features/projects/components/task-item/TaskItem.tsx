import './_task-item.scss';
import { useState } from 'react';
import type { Task } from "../../models/task.model";
import { OptionsBtn } from '../../../../shared/components/options-btn/OptionsBtn';
import { typeIcon } from '../../../../shared/utils/methods';
import { AsidePopup } from '../../../../shared/kits/aside-popup/AsidePopup';

export type TaskItemProps = { task: Task; } & React.HTMLAttributes<HTMLDivElement>;

export const TaskItem =  ({ task, ...props }: TaskItemProps) => {
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);
    return (
        <div className="task-item" {...props} >
            <section className='task-item__content'>
                <div className={`task-item__checkbox task-item__checkbox--${task.taskType}`}>
                    {typeIcon(task.taskType)}
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
                        <li className='options-list__item task-aside-container'>
                            Assignee
                            <AsidePopup >
                                <ul className='task-aside-container__item-aside'>
                                    <li>hello</li>
                                </ul>
                            </AsidePopup>
                        </li>
                        <li className='options-list__item'>Delete Task</li>
                        
                    </ul>
                </OptionsBtn>
              
            </section>
        </div>
    )
} 