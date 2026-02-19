import { NavLink } from "react-router-dom";
import { tasks } from "../../../../shared/utils/tasks";
import type { Task } from "../../model/task.model";
import { useState } from "react";

export const AllTasks = () => {
    const [isCurrentTask, setCurrentTask] = useState<boolean>(false);
    function onViewTask(task:Task) {
        console.log(task);
        setCurrentTask(!isCurrentTask);
    }
    return (
        <section>
            { isCurrentTask ? null :
                tasks.map((task: Task) => {
                    return (
                        <NavLink
                            to='/tasks/task-details'
                            onClick={() =>onViewTask(task)}>
                            <h3>{task.title}</h3>
                            <div>{task.description}</div>
                            <div>{task.status}</div>
                        </NavLink>
                    )
                })
            }
        </section>
        
    )
}
