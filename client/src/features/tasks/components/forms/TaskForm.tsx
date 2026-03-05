import { useTaskForm } from "./taskFormBuilder";

export const CreateTaskForm = () => {
  const { state, setField, setError, clearErrors, reset } = useTaskForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setField(e.target.name as "title" | "description" | "status" | "priority" | "dueAt", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();

    if (!state.title.trim()) {
      setError("title", "Title is required");
      return;
    }

    console.log(state);
    reset();
  };

  return (
      <form onSubmit={handleSubmit} className='form'>
        <h3>Create Task</h3>

        {/* Title */}
        <div className="form__form-group">
            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
                placeholder="Enter task title"
            />
        </div>

        {/* Description */}
        <div className="form__form-group">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={state.description}
                onChange={handleChange}
                placeholder="Optional description"
            />
        </div>

        {/* Status */}
        <div className="form__form-group">
            <label htmlFor="status">Status</label>
            <select
                id="status"
                name="status"
                value={state.status}
                onChange={handleChange}
            >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            </select>
        </div>

        {/* Priority */}
        <div className="form__form-group">
            <label htmlFor="priority">Priority</label>
            <select
                id="priority"
                name="priority"
                value={state.priority}
                onChange={handleChange}
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>
        </div>

        {/* Due Date */}
        <div className="form__form-group">
            <label htmlFor="dueAt">Due Date</label>
            <input
                id="dueAt"
                type="date"
                name="dueAt"
                value={state.dueAt}
                onChange={handleChange}
            />
        </div>

        <button type="submit" className="btn">
            Create Task
        </button>
    </form>
  );
};