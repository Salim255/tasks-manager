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


export const TaskViewer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const task  = useSelectedTask();
    
    const { state, setField } = useTaskForm(task);

       const handleChange = (
         event: ChangeEvent<
          HTMLInputElement |
          HTMLSelectElement |
          HTMLTextAreaElement
          >) => {

          if (event.target.name==="dueAt") {
            setField("dueAt", new Date(event.target.value).toISOString());
          } else {
            setField(
                event.target.name as
                "taskType" | "title" | "description" | "status" | "priority" | "dueAt",
                event.target.value,
            );
          }
      }

     
      const clickSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task?.id) return;
        
        const payload = removedUnchangedField(state, task);
        
        // Nothing changed it has always error: {}
        if(Object.keys(payload).length === 1) return;

        dispatch(updateTasHttp({ ...payload, taskId: task.id }));

        //reset();
      }


      const memberOptions = [
        { value: "1", label: "John Smith" },
        { value: "2", label: "Sarah Johnson" },
        { value: "3", label: "David Brown" },
        { value: "4", label: "Emma Wilson" },
    ];

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

    const onCancel = (fieldName: "status" | "priority" | "dueAt" | "assigneeId" | "description" | "title") => {
        const currentValue = state[fieldName] ?? null;
        const taskValue = task?.[fieldName] ?? null;
        console.log(currentValue !== taskValue, currentValue, taskValue)
        if (currentValue !== taskValue) {
            setField(fieldName, taskValue!);
        }
    };

    const getActionClass = (
        fieldName: "status" | "priority" | "dueAt" | "assigneeId" | "description" | "title"
    ) => {
        const currentValue = state[fieldName] ?? null;
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
                        value={state?.description}
                        name="description"
                        rows={2}
                        className="task-viewer__textarea"
                        placeholder="Build a modern task viewer inspired by Linear."
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
                                        setField("status", val)
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
                            setField("priority", val)
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
                            value={state.assigneeId}
                            options={memberOptions}
                            onChange={(val) =>
                                setField("assigneeId", val)
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
                            defaultValue="Salim Hassan"
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