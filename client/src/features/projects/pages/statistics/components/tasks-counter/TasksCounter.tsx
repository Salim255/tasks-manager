import "./_tasks-counter.scss";
import type { TaskStatus } from "../../../../models/task.model";
import { CircleChart } from "../circle-chart/CircleChart";


export const TasksCounter = ({
    circleChartDataPercentage,
}: { 
    circleChartDataPercentage: Record<TaskStatus, { label: TaskStatus; nb: number; value: number }>;
} ) => {
    return <div className="tasks-counter" >
        <h4 className="tasks-counter__title">Status overview</h4>
        <div>
         <CircleChart circleChartDataPercentage={ circleChartDataPercentage} />  
        </div>      
    </div>
}