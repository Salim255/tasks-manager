import { useState } from "react";
import { useTaskForm } from "../forms/taskFormBuilder";
import { BiPlus } from "react-icons/bi";
import { addTask, createTaskHttp, type CreateTaskPayload } from "../../states/taskSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { tasks } from "../../../../shared/utils/tasks";

export const CreateTask = () => {
  const [isCreateBtn, setCreateBtn] = useState<boolean>(true);
  const { state, setField, setError, clearErrors, reset } = useTaskForm();
  const [count, restCounter] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setField(e.target.name as "title" | "description" | "status" | "priority" | "dueAt", e.target.value);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("hello from submit", state)
    setCreateBtn(true);
    e.preventDefault();
    clearErrors();

    if (!state.title.trim()) {
      setError("title", "Title is required");
      return;
    }
    //
    const createPayload: CreateTaskPayload  = {
        title: state.title, 
        status: state.status, 
        priority: state.priority,
        dueAt: state.dueAt,
    }
   
     dispatch(createTaskHttp(createPayload));
     dispatch(addTask(tasks[count]));
     restCounter((prev) => prev+1)
    reset();
  };

  return (
    <>  
    {
        isCreateBtn ? 
            <button onClick={() =>setCreateBtn(false)}>
                <span><BiPlus></BiPlus></span>
                create task
            </button>
        :

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
    }
    
    </>
  
  );
};