import "./_update-task.scss";

export const UpdateTask = () => {
  return (
    <div className="update-task">

      <header className="update-task__header">
        <h2 className="update-task__title">Update task</h2>
      </header>

      <form className="form update-task__form">

        <div className="form__group">
          <label className="form__label">Title</label>
          <input className="form__input" />
        </div>

        <div className="form__group">
          <label className="form__label">Description</label>
          <textarea className="form__textarea" />
        </div>

        <div className="update-task__grid">

          <div className="form__group">
            <label className="form__label">Type</label>
            <select className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label">Status</label>
            <select className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label">Priority</label>
            <select className="form__input" />
          </div>

        </div>

        <div className="update-task__grid">

          <div className="form__group">
            <label className="form__label">Assignee</label>
            <input className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label">Due date</label>
            <input type="date" className="form__input" />
          </div>

        </div>

        <footer className="form__actions update-task__actions">
          <button type="button" className="btn btn--secondary">
            Cancel
          </button>

          <button type="submit" className="btn btn--primary">
            Update task
          </button>
        </footer>

      </form>
    </div>
  );
};