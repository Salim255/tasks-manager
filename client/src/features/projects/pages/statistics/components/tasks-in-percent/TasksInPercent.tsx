import type { TaskType } from "../../../../models/task.model";
import { BarChart } from "../bar-chart/BarChart";
import "./_tasks-in-percent.scss";

export const TasksInPercent = ({ barChartDataPercentage }: { barChartDataPercentage: Record<TaskType, {label: string; nb: number; value: number}>} ) => {
    return <div className="tasks-in-percent">
        <h4>Types of work </h4>
       <div>
         <BarChart  barChartDataPercentage={barChartDataPercentage} />
       </div>
    </div>
} 