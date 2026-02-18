import { NavLink, Outlet } from "react-router-dom";
import { tasks } from "../../shared/utils/tasks";
import type { Task } from "./model/task.model";

export const AllTasks = () => {
    function onViewTask(task:Task) {
        console.log(task)
    }
    return (
        <section>
            {
                tasks.map((task: Task) => {
                    return (
                        <NavLink
                            to='/all-tasks/task-details'
                            onClick={() =>onViewTask(task)}>
                            <h3>{task.title}</h3>
                            <div>{task.description}</div>
                            <div>{task.status}</div>
                        </NavLink>
                    )
                })
            }
            <Outlet></Outlet>
        </section>
        
    )
}
