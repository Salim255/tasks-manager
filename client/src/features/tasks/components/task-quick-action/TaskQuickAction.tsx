import "./_task-quick-action.scss";

export const TaskQuickAction = () => {
  return (
    <div className="task-quick-action">
      <form className="task-quick-action__form">
        {/* =====================================
            BASICS
        ===================================== */}
        <section className="task-quick-action__section">
          <div className="task-quick-action__section-header">
            <div>
              <h3 className="task-quick-action__section-title">
                Task details
              </h3>

              <p className="task-quick-action__section-description">
                Define the task, choose its type, and capture the work clearly.
              </p>
            </div>
          </div>

          <div className="task-quick-action__group">
            <label htmlFor="task-title" className="task-quick-action__label">
              Title
            </label>

            <p className="task-quick-action__hint">
              Use a short, actionable summary for the task.
            </p>

            <input
              id="task-title"
              type="text"
              className="task-quick-action__input"
              placeholder="Improve task quick action panel layout"
            />
          </div>

          <div className="task-quick-action__group">
            <label
              htmlFor="task-description"
              className="task-quick-action__label"
            >
              Description
            </label>

            <p className="task-quick-action__hint">
              Add context, expected outcome, or implementation notes.
            </p>

            <textarea
              id="task-description"
              className="task-quick-action__textarea"
              placeholder="Describe the goal, UX expectations, and any implementation details..."
            />
          </div>

          <div className="task-quick-action__grid">
            <div className="task-quick-action__group">
              <label htmlFor="task-type" className="task-quick-action__label">
                Type
              </label>

              <p className="task-quick-action__hint">
                Categorize the work item for the team.
              </p>

              <select
                id="task-type"
                className="task-quick-action__select"
                defaultValue="task"
              >
                <option value="task">Task</option>
                <option value="story">Story</option>
                <option value="bug">Bug</option>
              </select>
            </div>

            <div className="task-quick-action__group">
              <label
                htmlFor="task-priority"
                className="task-quick-action__label"
              >
                Priority
              </label>

              <p className="task-quick-action__hint">
                Set the urgency or business importance.
              </p>

              <select
                id="task-priority"
                className="task-quick-action__select"
                defaultValue="medium"
              >
                <option value="highest">Highest</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* =====================================
            PLANNING
        ===================================== */}
        <section className="task-quick-action__section">
          <div className="task-quick-action__section-header">
            <div>
              <h3 className="task-quick-action__section-title">
                Planning & ownership
              </h3>

              <p className="task-quick-action__section-description">
                Place the task in the right project flow and assign ownership.
              </p>
            </div>
          </div>

          <div className="task-quick-action__grid">
            <div className="task-quick-action__group">
              <label htmlFor="task-project" className="task-quick-action__label">
                Project
              </label>

              <p className="task-quick-action__hint">
                Choose the workspace where this task belongs.
              </p>

              <select
                id="task-project"
                className="task-quick-action__select"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a project
                </option>
                <option value="flowboard">FlowBoard</option>
                <option value="crm">CRM Platform</option>
              </select>
            </div>

            <div className="task-quick-action__group">
              <label htmlFor="task-sprint" className="task-quick-action__label">
                Sprint
              </label>

              <p className="task-quick-action__hint">
                Add the task to an active sprint if needed.
              </p>

              <select
                id="task-sprint"
                className="task-quick-action__select"
                defaultValue=""
              >
                <option value="">No sprint</option>
                <option value="sprint-12">Sprint 12</option>
                <option value="sprint-13">Sprint 13</option>
              </select>
            </div>

            <div className="task-quick-action__group">
              <label
                htmlFor="task-assignee"
                className="task-quick-action__label"
              >
                Assignee
              </label>

              <p className="task-quick-action__hint">
                Choose who will own the delivery of this task.
              </p>

              <select
                id="task-assignee"
                className="task-quick-action__select"
                defaultValue=""
              >
                <option value="">Unassigned</option>
                <option value="salim">Salim Hassan</option>
                <option value="alex">Alex Martin</option>
              </select>
            </div>

            <div className="task-quick-action__group">
              <label
                htmlFor="task-story-points"
                className="task-quick-action__label"
              >
                Story points
              </label>

              <p className="task-quick-action__hint">
                Estimate the effort required for delivery.
              </p>

              <input
                id="task-story-points"
                type="number"
                min="0"
                className="task-quick-action__input"
                placeholder="5"
              />
            </div>
          </div>
        </section>

        {/* =====================================
            FOOTER
        ===================================== */}
        <footer className="task-quick-action__footer">
          <button
            type="button"
            className="task-quick-action__button task-quick-action__button--ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="task-quick-action__button task-quick-action__button--primary"
          >
            Create task
          </button>
        </footer>
      </form>
    </div>
  );
};