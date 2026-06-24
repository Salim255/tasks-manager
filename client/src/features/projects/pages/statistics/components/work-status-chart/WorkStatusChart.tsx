import "./_work-tasks-chart.scss";
import type { TaskStatus } from "../../../../../tasks/models/task.model";
import { PieChart } from "../../../../../../shared/kits/pie-chart/PieChart";


export const WorkStatusChart = ({
    circleChartDataPercentage,
}: { 
    circleChartDataPercentage: Record<TaskStatus, { label: TaskStatus; nb: number; value: number }>;
} ) => {

    const statusColors: Record<TaskStatus, string> = {
        todo: "hsl(243, 70%, 50%)",
        in_progress: "hsl(24, 95%, 48%)",
        done: "hsl(148, 48%, 49%)",
    };

    const statusData = Object.entries(circleChartDataPercentage).map(
    ([status, data]) => ({
        id: status,
        label: data.label,
        value: data.nb,
        color: statusColors[status as TaskStatus],
    })
    );
    return <div className="work-status-chart" >
        <h4 className="work-status-chart__title">Work Status</h4>
        <PieChart  data={statusData}/> 
    </div>
}