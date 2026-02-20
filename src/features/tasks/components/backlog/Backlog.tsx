import { useEffect, useState } from 'react';
import './_backlog.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { CreateTask } from '../create-task/CreateTask';
import { TaskItem } from '../task-item/TaskItem';

export const Backlog = () => {
    const [message, setMessage] = useState("Drag the item and drop it in the box.");
    const  { isCreating, tasks } = useSelector((store: RootState) => store.taskSlice)
    
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

    useEffect(() => {
        console.log(tasks);
    }, [tasks, isCreating])
    return(
        <section className="backlog-container">
            <div className='backlog'>
               <section 
                draggable
                onDragStart={onDragStart}
                className='backlog__header'>
                    <div>
                        backlog (0 item)
                    </div>
                    <div>
                        create sprint
                    </div>
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
    )
}