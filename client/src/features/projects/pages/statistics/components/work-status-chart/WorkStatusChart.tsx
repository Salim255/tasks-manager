import "./_work-tasks-chart.scss";
import type { TaskStatus } from "../../../../models/task.model";
import { PieChart } from "../../../../../../shared/kits/pie-chart/PieChart";


export const WorkStatusChart = ({
    circleChartDataPercentage,
}: { 
    circleChartDataPercentage: Record<TaskStatus, { label: TaskStatus; nb: number; value: number }>;
} ) => {
    return <div className="work-status-chart" >
        <h4 className="work-status-chart__title">Work Status</h4>
        <PieChart /> 
    </div>
}