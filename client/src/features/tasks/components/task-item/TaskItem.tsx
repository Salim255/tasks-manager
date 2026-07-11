import './_task-item.scss';
import { useState } from 'react';
import type { Task } from "../../models/task.model";
import { OptionsBtn } from '../../../../shared/components/options-btn/OptionsBtn';
import { typeIcon } from '../../../../shared/utils/methods';
import { Assignee } from '../../../../shared/components/assignee/Assignee';
import { setTaskViewerTask } from '../../states/taskSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'recharts/types/state/store';
import { setQuickActionType, type QuickActionType } from '../../../../shared/modals/states/quickActionsSlice';
import { EditableTitle } from '../editable-title/EditableTitle';
import { EditableStatus } from '../editable-status/EditableStatus';
import { useMemberOptions } from '../../../members/hooks/MemberOptionsHook';


export type TaskItemProps = { task: Task; } & React.HTMLAttributes<HTMLDivElement>;

export const TaskItem =  ({ task, ...props }: TaskItemProps) => {
    const memberOptions = useMemberOptions();
     const taskStatuses = [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "done", label: "Done" },
    ];

    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const onViewTask = (taskId: string) => {
       dispatch(setTaskViewerTask({taskId}))
    }
    
  
    const onQuickAction = (item: QuickActionType ) => {
        onViewTask(task.id);
        dispatch(setQuickActionType({actionType: item}));
    }

    const handleSave = () => {
        console.log("hello from save")
    }

    return (
        <div  
            className={`task-item ${
                isOptionsOpen === task.id
                ? "task-item--menu-open"
                : ""
            }`} {...props} >
            <div 
                className="task-item__body"
                
               >
                <section className='task-item__content'>
                <div className={`task-item__checkbox task-item__checkbox--${task.taskType}`}>
                    {typeIcon(task.taskType)}
                </div>
                <div className='task-item__title'>
                    <EditableTitle title={task.title} handleSave={handleSave}/>
                </div>
                </section>
                <section className='task-item__status'>
                    <EditableStatus 
                        taskStatuses={taskStatuses}
                        taskStatus={task.status} 
                        handleSave={handleSave}/>
                   {/*   */}
                </section>
               
                <section className='task-item__assignee'>
                    <Assignee assigneeId={task.assigneeId} />
                </section>
              
            </div>
            <section className='task-item__actions'>
                <OptionsBtn 
                    item={task} 
                    isOptionsOpen={isOptionsOpen}
                    setOptionsOpen={setOptionsOpen}
                >
                    <ul className='options-list'>
                        <li 
                            onClick={() => {
                                onQuickAction("createTask");
                                setOptionsOpen(null);
                            }}
                            className='options-list__item task-aside-container'>
                            Edit Task
                           {/* <AsidePopup >
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