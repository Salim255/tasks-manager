import { useEffect, useState } from 'react';
import './_backlog.scss';
import { BiPlus } from "react-icons/bi";
import { CreateTaskForm } from '../forms/CreateTaskForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';

export const Backlog = () => {
    const [isCreateTask, setIsCreateTask] = useState<boolean>(false);
    const [message, setMessage] = useState("Drag the item and drop it in the box.");
    const  { isCreating } = useSelector((store: RootState) => store.taskSlice)

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

    const handleOnCreateTask =() => {
        setIsCreateTask(false);
    }

    useEffect(() => {
        if(isCreating) {
          setIsCreateTask(false)
        };
    }, [isCreating])
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
                    your backlog is empty
                </section>
                <section
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    className='backlog__footer'>
                   
                    {
                        isCreateTask  ? <CreateTaskForm></CreateTaskForm>  : 
                       <div onClick={handleOnCreateTask}>
                            <span><BiPlus /></span>
                            create work Item
                       </div>
                    }
                    
                </section>
            </div>
        </section>
    )
}