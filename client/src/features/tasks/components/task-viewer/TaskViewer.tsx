// 1 Header with close cross,
// 2 update section
// 3 task details section
import type { AppDispatch } from "recharts/types/state/store";
import "./_task-viewer.scss";
import { useDispatch } from "react-redux";
import { closeTaskViewer } from "../../states/taskSlice";

export const TaskViewer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const onCloseTaskViewer = () => {
        dispatch(closeTaskViewer())
    }

  return (
  
        <div className="task-viewer">

        {/*=====================================
            FORM
        =====================================*/}

        <form className="task-viewer__form scroll-bar">

            {/*=====================================
                UPDATE TASK
            =====================================*/}

            <section className="task-viewer__section">

                <div className="task-viewer__group">

                    <label className="task-viewer__label">
                        Summary
                    </label>

                    <input
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

                    <label className="task-viewer__label">
                        Description
                    </label>

                    <textarea
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

                        <label className="task-viewer__label">
                            Status
                        </label>

                        <select className="task-viewer__select">

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

                        <label className="task-viewer__label">
                            Priority
                        </label>

                        <select className="task-viewer__select">

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

                        <label className="task-viewer__label">
                            Assignee
                        </label>

                        <select className="task-viewer__select">

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

                        <label className="task-viewer__label">
                            Reporter
                        </label>

                        <input
                            className="task-viewer__input"
                            defaultValue="Salim Hassan"
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

                        <label className="task-viewer__label">
                            Due Date
                        </label>

                        <input
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

                    </div>

                </div>

            </section>

            {/*=====================================
                ACTIVITY
            =====================================*/}

            <section className="task-viewer__section">

                <h3 className="task-viewer__section-title">
                    Activity
                </h3>

                <div className="task-viewer__activity">

                    Comments and history...

                </div>

            </section>

        </form>

    </div>
  );
};