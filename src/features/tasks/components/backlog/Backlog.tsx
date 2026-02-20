import { useEffect, useState } from 'react';
import './_backlog.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { CreateTask } from '../create-task/CreateTask';
import { TaskItem } from '../task-item/TaskItem';
import { sprintsList } from '../../../../shared/utils/sprints';
import { addSprint, addTaskToSprint } from '../../states/sprintSlice';
import { SprintItem } from '../sprint-item/SprintItem';
import type { Task } from '../../model/task.model';
import { removeTask } from '../../states/taskSlice';

export const Backlog = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("Drag the item and drop it in the box.");
    const { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice);
    const { sprints } = useSelector((store: RootState) => store.sprintReducer);

    
    const onDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
        setMessage("Dragging...");
        //console.log("draging start", e, taskId);
        e.dataTransfer.setData("text/plain", JSON.stringify(task)); // any payload
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        //console.log(e);
        e.preventDefault(); // ✅ REQUIRED so onDrop can fire
    };

    const onDrop = (sprintId: string, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const task = JSON.parse(data);
        setMessage(`Dropped! payload="${data}"`);
        console.log("DROP fired ✅ payload:", task);

        dispatch(addTaskToSprint({task, sprintId}));
        dispatch(removeTask(task))
    };

    const createSprintHandler = () => {
        console.log("hello from create sprint");
        dispatch(addSprint(sprintsList[0]))
    }

    useEffect(() => {
        console.log(tasks, sprints);
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
                    <SprintItem sprint={sprint} /> 
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
                    className='backlog__content' >
                    { tasks.length ? 
                        tasks.map((task) => {
                           return   <TaskItem
                                draggable
                                onDragStart={(e) => onDragStart(task, e)}
                                key={task.id} task={task} 
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


