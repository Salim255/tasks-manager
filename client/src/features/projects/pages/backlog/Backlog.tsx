import { useEffect, useState } from 'react';
import './_backlog.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { CreateTask } from '../../components/create-task/CreateTask';
import { TaskItem } from '../../components/task-item/TaskItem';
import { sprintsList } from '../../../../shared/utils/sprints';
import { addSprint, addTaskToSprint, removeTaskFromSprint } from '../../states/sprintSlice';
import type { Task } from '../../models/task.model';
import { removeTask, setBackTaskToBacklog } from '../../states/taskSlice';
import { SprintHeader } from '../../components/sprint-header/SprintHeader';
import { Navigate, useParams } from 'react-router-dom';


export const Backlog = () => {
    const dispatch = useDispatch();
    const { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice);
    const { sprints } = useSelector((store: RootState) => store.sprintReducer);
    const { isOpen } = useSelector((store: RootState) => store.editSprintReducer);
    const { projectId }  = useParams();

    const [count, setCount] = useState<number>(0);
    const [isOptionsOpen, setOptionsOpen ] = useState<string | null>(null);
    
    const onDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // Any payload
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // REQUIRED so onDrop can fire
    };

    const onDrop = (sprintId: string, e: React.DragEvent<HTMLElement>) => {
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

    useEffect(() => {
        console.log(projectId);
    }, [tasks, isCreating, sprints, isOpen, projectId]);

    if (!projectId) return <Navigate to="/projects" replace />;

    return(
       <>
        <section className="backlog-container">
            { sprints.length > 0 
              && sprints.map((sprint) => {
                return sprint.projectId === projectId && (
                    <section 
                        className='backlog-container__sprints'
                        key={sprint.id}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(sprint.id, e)}
                        >
                        <section className="sprint" >
                            <SprintHeader 
                                sprint={sprint} 
                                isOptionsOpen={isOptionsOpen} 
                                setOptionsOpen={setOptionsOpen}
                                />
                            <div className='sprint__tasks'> 
                                { sprint?.tasks?.length ? 
                                    sprint?.tasks.map((task: Task) => {
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
                                <CreateTask projectId={projectId}/>
                            </div>
                        </section>
                    </section>
                )
              }) 
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
                <section
                    className='backlog__footer'>
                    <CreateTask projectId={projectId}/>
                </section>
            </section>
        </section>
       </>
    )
}


