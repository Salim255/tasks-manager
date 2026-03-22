import type { ChangeEvent } from "react";
import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import { useTaskForm } from "../../forms-builders/taskFormBuilder";
import { useTasksSelector } from "../../states/taskSelectors";
import type { CreateTaskPayload } from "../../http/task.http";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";

export const EditTask = () => {
    const { task } = useTasksSelector();
    const { state, setField, setError, clearErrors, reset } = useTaskForm();
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
    setField(
        e.target.name as "title" 
        | "taskType" 
        | "description"
        | "status"
        | "priority"
        | "dueAt", 
        e.target.value
    );
    };
    

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        setCreateBtn(true);
        e.preventDefault();
        clearErrors();
        if (!task?.projectId) return
        if (!state.title.trim()) {
            setError("title", "Title is required");
            return;
        }
        //
        const createPayload: CreateTaskPayload  = {
            title: state.title, 
            status: state.status, 
            projectId: task.projectId,
            taskType: state.taskType,
            ...(state.assigneeId && { assigneeId: state.assigneeId }),
            ...(state.dueAt && {dueAt: state.dueAt }),
        }
        
        dispatch(createTaskHttp(createPayload));
        reset();
    };
    

    return (
        <ModalOverlay>
            <div className="edit-task">
                hello editing task
            </div>
        </ModalOverlay>
    )
}