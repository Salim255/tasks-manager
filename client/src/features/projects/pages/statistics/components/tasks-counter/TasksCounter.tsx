import "./_tasks-counter.scss";
import type { Task, TaskStatus } from "../../../../models/task.model";
import { CircleChart } from "../circle-chart/CircleChart";


export const TasksCounter = ({
    tasksByStatus,
    circleChartDataPercentage,
}: { 
    tasksByStatus: Record<TaskStatus, Task[ ]>;
    circleChartDataPercentage: Record<TaskStatus, { label: TaskStatus; nb: number; value: number }>;
} ) => {
    return <div className="tasks-counter" >
        <h1>Status overview</h1>
       <div>
         <CircleChart tasksByStatus={tasksByStatus}  circleChartDataPercentage={ circleChartDataPercentage} />  
        </div>      
    </div>
}