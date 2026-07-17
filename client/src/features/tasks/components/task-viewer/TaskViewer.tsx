// 1 Header with close cross,
// 2 update section
// 3 task details section
import "./_task-viewer.scss";
import { useSelectedTask } from "../../states/taskSelectors";
import { useTaskForm } from "../../form-builder/taskFormBuilder";
import type { ChangeEvent } from "react";
import { removedUnchangedField } from "../../../../shared/utils/detect-field-change";
import { updateTasHttp } from "../../http/task.http";
import type { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import { useMemberOptions } from "../../../members/hooks/MemberOptionsHook";

 type EditableTaskField =
    | "taskType"
    | "title"
    | "description"
    | "status"
    | "priority"
    | "dueAt"
    | "assigneeId";

export const TaskViewer = () => {
    const memberOptions = useMemberOptions();
    const dispatch = useDispatch<AppDispatch>();
    const task  = useSelectedTask();
    
    const { state, setField } = useTaskForm(task);

   
    console.log(task, "Hello world");

    const handleFieldChange = (
        field: EditableTaskField,
        value: string
        ) => {
        if (field === "dueAt") {
            setField("dueAt", value ? new Date(value).toISOString() : "");
            return;
        }
    
        setField(field, value);
    };

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
        ) => {
        const { name, value } = event.target;
        handleFieldChange(name as EditableTaskField, value);
    };

     
      const clickSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task?.id) return;
        
        const payload = removedUnchangedField(state, task);
        
        // Nothing changed it has always error: {}
        if(Object.keys(payload).length === 1) return;
    
        dispatch(updateTasHttp({ ...payload, taskId: task.id }));
        console.log(payload);
      }

     const taskStatuses = [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "done", label: "Done" },
    ];

      const taskPriorities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ];

    const onCancel = (fieldName: EditableTaskField) => {
        const currentValue = state[fieldName] ?? null;
        const taskValue = task?.[fieldName] ?? null;
        if (currentValue !== taskValue) {
            setField(fieldName, taskValue!);
        }
    };

    const getActionClass = (
        fieldName: EditableTaskField
    ) => {
        const rawValue = state[fieldName];
        const currentValue =
            rawValue === undefined ||
            rawValue === null ||
            rawValue === "" ||
            rawValue === "unassigned"
                ? null
                : rawValue;

        const taskValue = task?.[fieldName] ?? null;
  
        return currentValue === taskValue 
            ? "task-viewer__actions"
            : "task-viewer__actions task-viewer__actions--active";
    };


  return (
  
        <div className="task-viewer">

    
        <form  onSubmit={clickSubmit} className="task-viewer__form scroll-bar">
            <section className="task-viewer__section">

                <div className="task-viewer__group">

                    <label htmlFor="title" className="task-viewer__label">
                        Summary
                    </label>

                    <input
                        onChange={handleChange}
                        value={state.title}
                        name="title"
                        type="text"
                        className="task-viewer__input"
                        placeholder="Improve Task Viewer"
                    />

                    <div className={getActionClass("title")}>

                        <button
                            type="button"
                            className="task-viewer__cancel"
                            onClick={() => onCancel("title")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="task-viewer__save"
                        >
                            Save
                        </button>

                    </div>

                </div>

                <div className="task-viewer__group">

                    <label className="task-viewer__label" htmlFor="description">
                        Description
                    </label>

                    <textarea
                        onChange={handleChange}
                        value={state?.description ?? ""}
                        name="description"
                        rows={2}
                        className="task-viewer__textarea"
                        placeholder="Describe the task, goals, requirements, and any important details..."
                    />

                    <div className={getActionClass("description")}>

                        <button
                            type="button"
                            className="task-viewer__cancel"
                            onClick={() => onCancel("description")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="task-viewer__save"
                        >
                            Save
                        </button>

                    </div>

                </div>

            </section>

            {/*=====================================
                TASK DETAILS
            =====================================*/}

            <section className="task-viewer__section">

                <h3 className="task-viewer__section-title">
                    Task Details
                </h3>

                <div className="task-viewer__grid">

                    <div className="task-viewer__group">

                        <label htmlFor="status" className="task-viewer__label">
                            Status
                        </label>
                        <div className="text">
                             <SelectDropdown
                                value={state.status}
                                options={taskStatuses}
                                onChange={(val) =>
                                handleFieldChange("status", val)
                                }
                                
                            />
                        </div>
            

                        <div className={getActionClass("status")}>

                            <button
                                type="button"
                                className="task-viewer__cancel"
                                onClick={() => onCancel("status")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="task-viewer__save"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                    <div className="task-viewer__group">

                        <label htmlFor="priority" className="task-viewer__label">
                            Priority
                        </label>

                        <SelectDropdown
                        value={state.priority}
                        options={taskPriorities}
                        onChange={(val) =>
                            handleFieldChange("priority", val)
                        }
                        />
                      

                        <div className={getActionClass("priority")}>

                            <button
                                type="button"
                                className="task-viewer__cancel"
                                onClick={() => onCancel("priority")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="task-viewer__save"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                    <div className="task-viewer__group">

                        <label htmlFor="" className="task-viewer__label">
                            Assignee
                        </label>

                         <SelectDropdown
                            value={state?.assigneeId ?? "unassigned"}
                            options={memberOptions}
                            onChange={(val) =>
                                handleFieldChange("assigneeId", val)
                            }
                            />

                        <div className={getActionClass("assigneeId")}>

                            <button
                                type="button"
                                className="task-viewer__cancel"
                                onClick={() => onCancel("assigneeId")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="task-viewer__save"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                    <div className="task-viewer__group">

                        <label htmlFor="reporter" className="task-viewer__label">
                            Reporter
                        </label>

                        <input
                            readOnly
                            className="task-viewer__input"
                            defaultValue={
                                `${task?.reporter?.profile.firstName} ${task?.reporter?.profile.lastName}`}
                        />
                    </div>

                    <div className="task-viewer__group">

                        <label htmlFor="dueAt" className="task-viewer__label">
                            Due Date
                        </label>



                         <input
                            name="dueAt"
                            value={state.dueAt?.split("T")[0]}
                            onChange={handleChange}
                            type="date"
                            className="task-viewer__input"
                        /> 

                        <div className={getActionClass("dueAt")}>

                            <button
                                type="button"
                                className="task-viewer__cancel"
                                onClick={() => onCancel("dueAt")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="task-viewer__save"
                            >
                                Save
                            </button>

                        </div>

                    </div>
                </div>

            </section>
        </form>

    </div>
  );
};