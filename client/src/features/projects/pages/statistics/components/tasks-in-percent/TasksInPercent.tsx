import type { TaskType } from "../../../../models/task.model";
import { BarChart } from "../bar-chart/BarChart";
import "./_tasks-in-percent.scss";

export const TasksInPercent = ({ barChartDataPercentage }: { barChartDataPercentage: Record<TaskType, {label: string; nb: number; value: number}>} ) => {
    return <div className="tasks-in-percent">
        <h1>Types of work </h1>
       <div>
         <BarChart  barChartDataPercentage={barChartDataPercentage} />
       </div>
    </div>
} 