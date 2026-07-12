import './_task-item.scss';
import { useState } from 'react';
import type { Task } from "../../models/task.model";
import { OptionsBtn } from '../../../../shared/components/options-btn/OptionsBtn';
import { typeIcon } from '../../../../shared/utils/methods';
import { setTaskViewerTask } from '../../states/taskSlice';
import { useDispatch } from 'react-redux';
import { setQuickActionType, type QuickActionType } from '../../../../shared/modals/states/quickActionsSlice';
import { EditableTitle } from '../editable-title/EditableTitle';
import { EditableStatus } from '../editable-status/EditableStatus';
import { useMemberOptions } from '../../../members/hooks/MemberOptionsHook';
import { EditableAssignee } from '../editable-assignee/EditableAssignee';
import { updateTasHttp } from '../../http/task.http';
import type { AppDispatch } from '../../../../redux/store';


export type TaskItemProps = { task: Task; } & React.HTMLAttributes<HTMLDivElement>;


export const TaskItem =  ({ task, ...props }: TaskItemProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const memberOptions = useMemberOptions();
     const taskStatuses = [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "done", label: "Done" },
    ];

    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);


    const onViewTask = (taskId: string) => {
       dispatch(setTaskViewerTask({taskId}))
    }
    
  
    const onQuickAction = (item: QuickActionType ) => {
        onViewTask(task.id);
        dispatch(setQuickActionType({actionType: item}));
    }

    const handleSave = (field: "status" | "assigneeId", value: string) => {
        if (!field || !value) return;

        //TODO: If the task's value equal the onchange value ignore the change
        dispatch(
            updateTasHttp({
                taskId: task.id,
                [field]: value,
            })
        );
    };

    return (
        <div  
            
            className={`task-item ${
                isOptionsOpen === task.id
                ? "task-item--menu-open"
                : ""
            }`} {...props} >
            <div 
                className="task-item__body"
                onClick={() => onQuickAction("createTask")}
               >
                <section className='task-item__content'>
                    <div className={`task-item__checkbox task-item__checkbox--${task.taskType}`}>
                        {typeIcon(task.taskType)}
                    </div>
                    <div className='task-item__title' >
                        <EditableTitle title={task.title} handleSave={() => onQuickAction("createTask")}/>
                    </div>
                </section>
                <section className='task-item__status'>
                    <EditableStatus 
                        taskStatuses={taskStatuses}
                        taskStatus={task.status} 
                        handleSave={(v) => handleSave("status", v)}/>
                </section>
               
                <section className='task-item__assignee'>
                   < EditableAssignee
                    TaskAssigneeId={task.assigneeId ?? "unassigned"}
                    taskMembers={memberOptions}
                    handleSave={(v) => handleSave("assigneeId", v)}
                    />
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
                                setOptionsOpen(null);
                                onQuickAction("createTask")
                            }}
                            className='options-list__item'>
                            Edit Task
                        </li>
                        <li className='options-list__item'>Delete Task</li>
                        
                    </ul>
                </OptionsBtn> 
            </section>
        </div>
    )
} 