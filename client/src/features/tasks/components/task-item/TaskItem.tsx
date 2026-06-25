import './_task-item.scss';
import { useState } from 'react';
import type { Task } from "../../models/task.model";
import { OptionsBtn } from '../../../../shared/components/options-btn/OptionsBtn';
import { typeIcon } from '../../../../shared/utils/methods';
import { Assignee } from '../../../../shared/components/assignee/Assignee';
import { Status } from '../../../../shared/components/task-status/TaskStatus';
import { setIsOpenTaskModal } from '../../states/taskSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'recharts/types/state/store';


export type TaskItemProps = { task: Task; } & React.HTMLAttributes<HTMLDivElement>;

export const TaskItem =  ({ task, ...props }: TaskItemProps) => {
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const openEditTaskModal =() => {
      dispatch(setIsOpenTaskModal({taskId: task.id}))
    }

    return (
        <div 
            className={`task-item ${
                isOptionsOpen === task.id
                ? "task-item--menu-open"
                : ""
            }`} {...props} >
            <section className='task-item__content'>
                <div className={`task-item__checkbox task-item__checkbox--${task.taskType}`}>
                    {typeIcon(task.taskType)}
                </div>
                <div className='task-item__title'>
                    {task.title}  
                </div>
            </section>
            <section className='task-item__status'>
                <Status status={task.status} />
            </section>
            <section className='task-item__assignee'>
                <Assignee assigneeId={task.assigneeId} />
            </section>
            <section className='task-item__actions'>
                <OptionsBtn 
                    item={task} 
                    isOptionsOpen={isOptionsOpen}
                    setOptionsOpen={setOptionsOpen}
                >
                    <ul className='options-list'>
                        <li 
                            onClick={openEditTaskModal}
                            className='options-list__item task-aside-container'>
                            Edit Task
                           {/*  <AsidePopup >
                                <div className='task-aside-container__item-aside'>
                                    < MemberItem key={task.id} task={task} />
                                </div>
                            </AsidePopup> */}
                        </li>
                        <li className='options-list__item'>Delete Task</li>
                        
                    </ul>
                </OptionsBtn>
              
            </section>
        </div>
    )
} 