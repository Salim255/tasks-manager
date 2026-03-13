import { useTasksSelector } from "../../states/taskSelectors";

export const TasksList = () => {
    const { tasks } = useTasksSelector();
    return <div>
        Hell for tasks list
            <div>
                {
                    tasks.map((task) => {
                       return  <div id={task.id}>
                            {task.title}
                        </div>
                    })
                }
            </div>
        </div>
}