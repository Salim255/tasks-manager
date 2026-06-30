import './_board-task-item.scss';
import { useState } from "react";
import { OptionsBtn } from "../../../../../../shared/components/options-btn/OptionsBtn";
import type { TaskItemProps } from "../../../../../tasks/components/task-item/TaskItem";
import { GoPerson } from "react-icons/go";
import { typeIcon } from '../../../../../../shared/utils/methods';
import type { AppDispatch } from '../../../../../../redux/store';
import { useDispatch } from 'react-redux';
import { setTaskViewerTask } from '../../../../../tasks/states/taskSlice';

export const BoardTaskItem =  ({ task, ...props }: TaskItemProps) => {
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const onViewTask = (taskId: string) => {
       dispatch(setTaskViewerTask({taskId}))
    }

    return (
        <div className="board-task-item" {...props} >
            <section className='board-task-item__content'>
                <p className='board-task-item__task'>
                    {task.title}
                </p>
                <div className='board-task-item__actions'>
                    <OptionsBtn 
                        item={task} 
                        isOptionsOpen={isOptionsOpen}
                        setOptionsOpen={setOptionsOpen}
                    >
                        <ul className='options-list'>
                            <li className='options-list__item'  onClick={() => onViewTask(task.id)}>Edit Task</li>
                            <li className='options-list__item'>Delete Task</li>
                        </ul>
                    </OptionsBtn>
                </div>
            </section>
            <section className='board-task-item__footer'>
                <div className={`board-task-item__checkbox board-task-item__checkbox--${task.taskType}`}>
                    <span>
                        { typeIcon(task.taskType) }
                    </span>
                    {task.taskType}
                </div>
                <div className='board-task-item__assignee'>
                    {/* {task.assigneeId} */}
                    <GoPerson/>
                </div>
            </section>
        </div>
    )
} 