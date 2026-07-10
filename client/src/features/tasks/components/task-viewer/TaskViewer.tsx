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

export const TaskViewer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const task  = useSelectedTask();
    
    const { state, setField, reset } = useTaskForm(task);

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
      console.log(task, state)
  return (
  
        <div className="task-viewer">

        {/*=====================================
            FORM
        =====================================*/}

        <form  onSubmit={clickSubmit} className="task-viewer__form scroll-bar">

            {/*=====================================
                UPDATE TASK
            =====================================*/}

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
                        defaultValue="Improve Task Viewer"
                    />

                    <div className="task-viewer__actions">

                        <button
                            type="button"
                            className="task-viewer__cancel"
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
                        value={state.description}
                        rows={4}
                        className="task-viewer__textarea"
                        defaultValue="Build a modern task viewer inspired by Linear."
                    />

                    <div className="task-viewer__actions">

                        <button
                            type="button"
                            className="task-viewer__cancel"
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

                        <select 
                             onChange={handleChange}   
                            value={state.status} className="task-viewer__select">

                            <option>Todo</option>
                            <option selected>In Progress</option>
                            <option>Done</option>

                        </select>

                        <div className="task-viewer__actions">

                            <button
                                type="button"
                                className="task-viewer__cancel"
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

                        <select   onChange={handleChange}  value={state.priority} className="task-viewer__select">

                            <option>Highest</option>
                            <option selected>High</option>
                            <option>Medium</option>
                            <option>Low</option>

                        </select>

                        <div className="task-viewer__actions">

                            <button
                                type="button"
                                className="task-viewer__cancel"
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

                        <select value={state.assigneeId} className="task-viewer__select">

                            <option>Unassigned</option>

                        </select>

                        <div className="task-viewer__actions">

                            <button
                                type="button"
                                className="task-viewer__cancel"
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

                        <div className="task-viewer__actions">

                            <button
                                type="button"
                                className="task-viewer__cancel"
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
{/* 
                    <div className="task-viewer__group">

                        <label className="task-viewer__label">
                            Story Points
                        </label>

                        <input
                            type="number"
                            className="task-viewer__input"
                            defaultValue="5"
                        />

                        <div className="task-viewer__actions">

                            <button
                                type="button"
                                className="task-viewer__cancel"
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

                    </div> */}

                </div>

            </section>

            {/*=====================================
                ACTIVITY
            =====================================*/}

            {/* <section className="task-viewer__section">

                <h3 className="task-viewer__section-title">
                    Activity
                </h3>

                <div className="task-viewer__activity">

                    Comments and history...

                </div>

            </section> */}

        </form>

    </div>
  );
};