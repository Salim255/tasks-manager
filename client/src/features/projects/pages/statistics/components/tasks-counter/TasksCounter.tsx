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
        <h4 className="tasks-counter__title">Status overview</h4>
        <div>
         <CircleChart tasksByStatus={tasksByStatus}  circleChartDataPercentage={ circleChartDataPercentage} />  
        </div>      
    </div>
}