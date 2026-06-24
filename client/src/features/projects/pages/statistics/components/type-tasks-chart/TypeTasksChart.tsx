import "./_type-tasks-chart.scss";
import type { TaskStatus } from "../../../../models/task.model";
import { PieChart } from "../../../../../../shared/kits/pie-chart/PieChart";


export const TypeTasksChart = ({
    circleChartDataPercentage,
}: { 
    circleChartDataPercentage: Record<TaskStatus, { label: TaskStatus; nb: number; value: number }>;
} ) => {
    return <div className="type-tasks-chart" >
        <h4 className="type-tasks-chart__title">Work Status</h4>
        <PieChart /> 
    </div>
}