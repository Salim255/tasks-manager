import { useEffect, useState } from 'react';
import './_backlog.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { CreateTask } from '../create-task/CreateTask';
import { TaskItem } from '../task-item/TaskItem';
import { sprintsList } from '../../../../shared/utils/sprints';
import { addSprint } from '../../states/sprintSlice';
import { SprintsContainer } from '../sprints/SprintsContainer';

export const Backlog = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("Drag the item and drop it in the box.");
    const { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice);
    const { sprints } = useSelector((store: RootState) => store.sprintReducer);

    
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setMessage("Dragging...");
        e.dataTransfer.setData("text/plain", "hello"); // any payload
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // ✅ REQUIRED so onDrop can fire
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        setMessage(`Dropped! payload="${data}"`);
        console.log("DROP fired ✅ payload:", data);
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
            { sprints.length ? <SprintsContainer sprints={sprints} /> : null}
            <div className='backlog'>
               <section 
                draggable
                onDragStart={onDragStart}
                className='backlog__header'>
                    <div>
                        backlog (0 item)
                    </div>

                    <button onClick={createSprintHandler}>create sprint</button>
                 
               </section>
                <section className='backlog__content' >
                    { tasks.length ? 
                        tasks.map((task) => {
                           return  <TaskItem task={task} />
                        }): 
                        <h1>
                             your backlog is empty
                        </h1>
                    }
                   
                </section>
                <section
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    className='backlog__footer'>
                   
                    <CreateTask/>
                    
                </section>
            </div>
        </section>
       </>
    )
}
