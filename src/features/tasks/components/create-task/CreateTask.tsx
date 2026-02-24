import './_createTask.scss';
import { useState } from "react";
import { useTaskForm } from "../forms/taskFormBuilder";
import { BiPlus } from "react-icons/bi";
import { addToBacklogTask, createTaskHttp, type CreateTaskPayload } from "../../states/taskSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { tasks } from "../../../../shared/utils/tasks";
import { TaskTypeDropdown } from '../../../../shared/components/task-type-dropdown/TaskTypeDropdown';

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
    dispatch(addToBacklogTask({ task: tasks[count] }));
    restCounter((prev) => prev+1)
    reset();
  };
   
  return (
    <>  
    {
        isCreateBtn ? 
            <button 
                className='create-btn'
                onClick={() =>setCreateBtn(false)}>
                <div className='create-btn__icon'>
                    <BiPlus></BiPlus>
                </div>
                <span>create task</span>
            </button>
            :
            <form onSubmit={handleSubmit} className='create-task-form'>
                {/* Title */}
                <div className="create-task-form__form-group-title">
                    <TaskTypeDropdown />
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                        placeholder="Describe whats need to be done task"
                    />
                </div>
                {/* Due Date */}
                <div className="create-task-form__form-group-date">
                    {/* <label htmlFor="dueAt"> <CiCalendar /></label> */}
                    <input
                        id="dueAt"
                        type="date"
                        name="dueAt"
                        value={state.dueAt}
                        onChange={handleChange}
                    />
                </div>

                <button 
                    disabled={state.title?.length === 0}
                    type="submit" 
                    className="btn create-task-form__btn">
                    Create Task
                </button>
            </form>
    }
    </>
  );
};

