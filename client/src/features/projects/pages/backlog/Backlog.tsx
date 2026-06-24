import { useEffect } from 'react';
import './_backlog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../redux/store';
import { CreateTask } from '../../../tasks/components/create-task/CreateTask';
import { TaskItem } from '../../../tasks/components/task-item/TaskItem';
import type { Task } from '../../../tasks/models/task.model';
import { SprintHeader } from '../../../sprints/components/sprint-header/SprintHeader';
import { Navigate, useParams } from 'react-router-dom';
import { useSprintModalOpen, useSprints } from '../../../sprints/states/sprintSelectors';
import { updateTaskSprintHttp } from '../../../tasks/http/task.http';
import { createSprint } from '../../../sprints/http/sprint.http';
import { EditSprintForm } from '../../../sprints/components/edit-sprint-form/EditSprintForm';

export const Backlog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice);
    const isOpenModal = useSprintModalOpen();
    const sprints = useSprints();
    const { projectId }  = useParams();
    
    const onDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // Any payload
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // REQUIRED so onDrop can fire
    };

    const onDrop = (sprintId: string, e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task: Task = JSON.parse(data);

        if(task.sprintId === sprintId ) return;
        dispatch(updateTaskSprintHttp({ taskId: task.id, sprintId }));
    };

    const onReverseDrop =  (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);
        dispatch(updateTaskSprintHttp({ taskId: task.id, sprintId: null }));
    };

    const createSprintHandler = () => {
       if(!projectId) return;
       dispatch(createSprint({projectId}));
    }

    const countWorkItem = () => {
        return tasks.filter((task) => !task.sprintId).length;
    }
    
    useEffect(() => {
         
    }, [tasks, isCreating, sprints, projectId]);

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
                            />
                            <div className='sprint__tasks'> 
                                { tasks?.length ? 
                                    tasks.map((task: Task) => {
                                     return task.sprintId === sprint.id ?  <TaskItem
                                            draggable
                                            onDragStart={(e) => onDragStart(task, e)}
                                            key={task.id} 
                                            task={task} 
                                        />: null
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
                        Backlog <span className="work-count">{countWorkItem()}</span> works item
                    </div>
                    
                    <button onClick={createSprintHandler}>create sprint</button>
               </section>
                {/* Content */}
                <section 
                    onDragOver={onDragOver}
                    onDrop={onReverseDrop}
                    className='backlog__content' >
                    { tasks.filter((tsk) => !tsk.sprintId)?.length ? 
                        tasks.filter((t) => !t.sprintId).map((task) => {
                           return <TaskItem
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
        { isOpenModal && <EditSprintForm/> }
       </>
    )
}


