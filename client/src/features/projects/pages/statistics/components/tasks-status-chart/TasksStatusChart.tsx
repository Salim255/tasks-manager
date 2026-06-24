import type { TaskType } from "../../../../models/task.model";
import { BarChart } from "../../../../../../shared/kits/bar-chart/BarChart";
import "./_tasks-status-chart.scss";

export const TasksStatusChart = ({
  barChartDataPercentage 
}: { 
    barChartDataPercentage: Record<TaskType, 
    { 
      label: string; 
      nb: number; 
      value: number
    }>
  } ) => {
  return <div className="tasks-status-chart">
    <h4 className="tasks-status-chart__title">Types of work </h4>
    <BarChart  barChartDataPercentage={barChartDataPercentage} />
  </div>
} 