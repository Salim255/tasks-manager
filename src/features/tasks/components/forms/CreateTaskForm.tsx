import { useEffect, useReducer } from 'react';
import './_forms.scss';


type TaskStatus = "todo" | "in_progress" | "done";
type TaskPriority = "low" | "medium" | "high";

type TaskFormState = {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueAt?: string;
    errors: Record<string, string>;
};

type Action = { type: "SET_FIELD"; field: string; value: string } | 
{ type: "SET_ERROR"; field: string; message: string } | 
{ type: "CLEAR_ERRORS" };

const initialState: TaskFormState = { title: "", description: "", status: 'todo', priority: "low", errors: {}  };

function reducer(state: TaskFormState, action: Action) { 
    switch (action.type) { 
       
        case "SET_FIELD": 
            return { 
                ...state, 
                [action.field]: action.value,
            }; 
        case "SET_ERROR": 
            return { 
                ...state, 
                errors: { 
                    ...state.errors, 
                    [action.field]: action.message,
                 } 
            }; 
        case "CLEAR_ERRORS": 
            return { 
                ...state, 
                errors: {},
             }; 
        default: 
            return state; 
    } 
}


export const CreateTaskForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch({
        type: 'SET_FIELD',
        field: event.target.name,
        value: event.target.value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.title.trim()) return;
    console.log(state);
  };

  useEffect(() => {
    //console.log(state);
  }, [state])
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