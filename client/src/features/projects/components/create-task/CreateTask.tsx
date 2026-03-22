import './_create-task.scss';
import { useState, type ChangeEvent } from "react";
import { useTaskForm } from "../../forms-builders/taskFormBuilder";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { TaskTypeDropdown } from '../../../../shared/components/task-type-dropdown/TaskTypeDropdown';
import { createTaskHttp, type CreateTaskPayload } from '../../http/task.http';
import { typeIcon } from '../../../../shared/utils/methods';

export const CreateTask = ( { projectId }: { projectId: string}) => {
  const [isCreateBtn, setCreateBtn] = useState<boolean>(true);
  const { state, setField, setError, clearErrors, reset } = useTaskForm();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setField(
        e.target.name as "title" 
        | "taskType" 
        | "description"
        | "status"
        | "priority"
        | "dueAt", 
        e.target.value
    );
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
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
        projectId: projectId,
        taskType: state.taskType,
        ...(state.assigneeId && { assigneeId: state.assigneeId }),
        ...(state.dueAt && {dueAt: state.dueAt }),
    }
   
    dispatch(createTaskHttp(createPayload));
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
                    <TaskTypeDropdown
                    name="taskType"
                      value={state.taskType}
                      onChange={handleChange}
                    >
                        <option value="task"> Task </option>
                        <option value="bug"> { typeIcon('task') } Bug </option>
                        <option value="story"> {typeIcon('story')} Story</option>
                    </TaskTypeDropdown>
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

