import { useTasksSelector } from "../../states/taskSelectors";
import "./_tasks-list.scss";
import { TaskListItem } from "./components/task-list-item/TaskListItem";
import { TasksListHeader } from "./components/tasks-list-header/TasksListHeader";

export const TasksList = () => {
    const { tasks } = useTasksSelector();
    return <div className="tasks-list">
          
        <TasksListHeader/>
        {
            tasks.map((task) => {
                return  <TaskListItem task={task}/>
            })
        }        
    </div>
}