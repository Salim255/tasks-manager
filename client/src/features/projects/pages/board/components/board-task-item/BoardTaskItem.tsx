import './_board-task-item.scss';
import { useState } from "react";
import { OptionsBtn } from "../../../../../../shared/components/options-btn/OptionsBtn";
import type { TaskItemProps } from "../../../../../tasks/components/task-item/TaskItem";
import type { AppDispatch } from '../../../../../../redux/store';
import { useDispatch } from 'react-redux';
import { setTaskViewerTask } from '../../../../../tasks/states/taskSlice';
import { setQuickActionType, type QuickActionType } from '../../../../../../shared/modals/states/quickActionsSlice';
import { EditableTaskType } from '../../../../../tasks/components/editable-task-type/EditableTaskType';
import { updateTasHttp } from '../../../../../tasks/http/task.http';
import { EditableAssignee } from '../../../../../tasks/components/editable-assignee/EditableAssignee';
import { useMemberOptions } from '../../../../../members/hooks/MemberOptionsHook';
import { EditableTitle } from '../../../../../tasks/components/editable-title/EditableTitle';

export const BoardTaskItem =  ({ task, ...props }: TaskItemProps) => {
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);

    const memberOptions = useMemberOptions();

    const onQuickAction = (item: QuickActionType ) => {
        onViewTask(task.id);
        dispatch(setQuickActionType({actionType: item}));
    }

    const dispatch = useDispatch<AppDispatch>();

    const onViewTask = (taskId: string) => {
       dispatch(setTaskViewerTask({taskId}))
    }

    const handleSave = (field: "status" | "assigneeId" | "taskType", value: string) => {
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
        <div className="board-task-item" {...props} onClick={() => onQuickAction("createTask")} >
            <section className='board-task-item__content'>
                
               
                <EditableTitle title={task.title} handleSave={() => onQuickAction("createTask")}/>
               
                <div className='board-task-item__actions' onClick={(e) => e.stopPropagation()}>
                    <OptionsBtn 
                        item={task} 
                        isOptionsOpen={isOptionsOpen}
                        setOptionsOpen={setOptionsOpen}
                    >
                        <ul className='options-list'>
                            <li className='options-list__item' onClick={() => onQuickAction("createTask")}>
                                Edit Task
                            </li>
                            <li className='options-list__item'> Delete Task </li>
                        </ul>
                    </OptionsBtn>
                </div>
            </section>
            <section className='board-task-item__footer'>
                <div className="board-task-item__task-type" onClick={(e) => e.stopPropagation()}>
                    <EditableTaskType
                        badgeType={"badge"} 
                        taskType={task.taskType} 
                        handleSave={(v) => handleSave("taskType", v)}/>
    
                </div>
                <div className='board-task-item__assignee' onClick={(e) => e.stopPropagation()}>
                     <EditableAssignee
                        TaskAssigneeId={task.assigneeId ?? "unassigned"}
                        taskMembers={memberOptions}
                        handleSave={(v) => handleSave("assigneeId", v)}
                        />
                </div>
            </section>
        </div>
    )
} 