import "./_tasks-counter.scss";
import type { Task, TaskStatus } from "../../../../models/task.model";
import { CircleChart } from "../circle-chart/CircleChart";


export const TasksCounter = ({ tasksByStatus }: { tasksByStatus: Record<TaskStatus, Task[ ]>} ) => {
    return <div className="tasks-counter" >
        <h1>Status overview</h1>
       <div>
         <CircleChart tasksByStatus={tasksByStatus} />  
        </div>      
    </div>
}