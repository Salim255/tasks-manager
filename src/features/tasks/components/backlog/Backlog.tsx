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

export const Backlog = () => {
    const dispatch = useDispatch();
    const { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice);
    const { sprints } = useSelector((store: RootState) => store.sprintReducer);

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

        if( task.sprintId === sprintId ) return;

        dispatch(addTaskToSprint({task, sprintId}));
        dispatch(removeTask(task));
        console.log("hello")
    };

    const onReverseDrop =  (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);

       dispatch(removeTaskFromSprint({ taskId: task.id,  sprintId: task.sprintId }));
       dispatch(setBackTaskToBacklog({ task }))
    };

    const createSprintHandler = () => {
        //const sprintIndex = sprintsList?.length;
        console.log( sprintsList.length, "heelo", count);
        if(count>3) return;
        //const sprintIndex = sprintsList?.length;
       dispatch(addSprint(sprintsList[count]));
       setCount((prev)=> prev+1);
    }

    useEffect(() => {
    }, [tasks, isCreating, sprints])
    return(
       <>
        <section className="backlog-container">
            { sprints.length 
              ? sprints.map((sprint) => {
                return <div 
                        key={sprint.id}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(sprint.id, e)}>
                    {/* <SprintItem sprint={sprint} />  */}
                    <div className="sprint-item" >
                        <div>header {sprint.name}</div>
                        <div> 
                            {
                               sprint.tasks.map((task) => {
                                    return <div  
                                    draggable
                                    onDragStart={(e) => onDragStart(task, e)}> 
                                    {task.title}
                                </div>
                                })
                            }
                        </div>

                        <div>footer</div>
                    </div>
                </div>
              }) 
              : null
            }
            <div className='backlog'>
                {/* Header */}
               <section 
                className='backlog__header'>
                    <div>
                        backlog (0 item)
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
                        <h1>
                             your backlog is empty
                        </h1>
                    }
                </section>
                {/* Footer  */}
                <section
                    className='backlog__footer'>
                    <CreateTask/>
                </section>
            </div>
        </section>
       </>
    )
}


