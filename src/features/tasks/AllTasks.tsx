import { tasks } from "../../shared/utils/tasks";

export const AllTasks = () => {
    
    return (
        <section>
            {
                tasks.map((task) => {
                    return (
                        <div>
                            <h3>{task.title}</h3>
                            <div>{task.description}</div>
                            <div>{task.status}</div>
                        </div>
                    )
                })
            }
        </section>
    )
}
