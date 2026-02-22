import { useEffect, useState } from 'react';
import './_backlog.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { CreateTask } from '../create-task/CreateTask';
import { TaskItem } from '../task-item/TaskItem';
import { sprintsList } from '../../../../shared/utils/sprints';
import { addSprint, addTaskToSprint, removeTaskFromSprint } from '../../states/sprintSlice';
import type { Task } from '../../model/task.model';
import { removeTask, setBackTaskToBacklog } from '../../states/taskSlice';
import { SlOptions } from 'react-icons/sl';
import { FaRegEdit } from "react-icons/fa";
import type { Sprint } from '../../model/sprint.model';
import { openEditSprint } from '../../states/editSprintSlice';
import { EditSprintDate } from '../edit-sprint-date/EditSprintDate';


export const Backlog = () => {
    const dispatch = useDispatch();
    const { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice);
    const { sprints } = useSelector((store: RootState) => store.sprintReducer);
    const { isOpen } = useSelector((store: RootState) => store.editSprintReducer);

    const [count, setCount] = useState<number>(0);
    
    const onDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // any payload
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // ✅ REQUIRED so onDrop can fire
    };

    const onDrop = (sprintId: string, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);

        if(task.sprintId === sprintId ) return;

        dispatch(addTaskToSprint({task, sprintId}));
        dispatch(removeTask({ task }));
    };

    const onReverseDrop =  (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);

       dispatch(removeTaskFromSprint({ taskId: task.id,  sprintId: task.sprintId }));
       dispatch(setBackTaskToBacklog({ task }))
    };

    const createSprintHandler = () => {
        if (count > 3) return;
       
       dispatch(addSprint(sprintsList[count]));
       setCount((prev) => prev+1);
    }

    const editSprintDate = (sprint: Sprint) => {
        console.log(sprint, "hello from edit sprint date");
        dispatch(openEditSprint({ sprint }));
    }
    useEffect(() => {
        console.log(isOpen, "hello from sprint 🛑🛑");
    }, [tasks, isCreating, sprints, isOpen])
    return(
       <>
        <section className="backlog-container">
            { sprints.length 
              ? sprints.map((sprint) => {
                return (
                    <section 
                        className='backlog-container__sprints'
                        key={sprint.id}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(sprint.id, e)}
                        >
                        {/* <SprintItem sprint={sprint} />  */}
                        <section className="sprint" >
                            <div className='sprint__header'>
                               <div className='sprint-title'>
                                    Scrum {sprint.name} 
                                    <span> 
                                       {
                                        sprint.startDate && sprint.endDate 
                                        ? ` (${new Date(sprint.startDate).toLocaleDateString()} - ${new Date(sprint.endDate).toLocaleDateString()})`
                                        : 
                                        <>
                                            <button onClick={() => editSprintDate(sprint)}> 
                                                <span><FaRegEdit/></span> 
                                                add date
                                            </button> 
                                        </>
                                       }
                                    </span> 
                                    <span> ({sprint.tasks.length} work items) </span>
                               </div>
                                <div className='sprint-actions'>
                                    <button disabled={sprint?.tasks?.length === 0}>start sprint</button>
                                </div>
                                <div className='sprint-options'>
                                    <SlOptions/>
                                </div>
                            </div>
                            <div className='sprint__tasks'> 
                                { sprint?.tasks?.length ? 
                                    sprint?.tasks.map((task) => {
                                    return   <TaskItem
                                            draggable
                                            onDragStart={(e) => onDragStart(task, e)}
                                            key={task.id} 
                                            task={task} 
                                        />
                                    }): <div className='empty'>
                                        Your backlog is empty
                                    </div>
                                }
                            </div>
                            <div
                                className='sprint__footer'>
                                <CreateTask/>
                            </div>
                        </section>
                    </section>
                )
              }) 
              : null
            }
            <section className='backlog'>
                {/* Header */}
               <section 
                className='backlog__header'>
                    <div>
                        Backlog (0 works item)
                    </div>

                    <button onClick={createSprintHandler}>create sprint</button>
               </section>
                {/* Content */}
                <section 
                    onDragOver={onDragOver}
                    onDrop={onReverseDrop}
                    className='backlog__content' >
                    { tasks.length ? 
                        tasks.map((task) => {
                           return   <TaskItem
                                draggable
                                onDragStart={(e) => onDragStart(task, e)}
                                key={task.id} 
                                task={task} 
                            />
                        }): 
                        <div className='empty'>
                            Your backlog is empty
                        </div>
                    }
                </section>
                {/* Footer  */}
                <section
                    className='backlog__footer'>
                    <CreateTask/>
                </section>
            </section>
        </section>

        {isOpen && <EditSprintDate/>}
       </>
    )
}


