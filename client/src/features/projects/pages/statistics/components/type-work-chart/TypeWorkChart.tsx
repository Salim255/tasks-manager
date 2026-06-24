import type { TaskType } from "../../../../../tasks/models/task.model";
import { BarChart } from "../../../../../../shared/kits/bar-chart/BarChart";
import "./_type-work-chart.scss";

export const TypeWorkChart = ({
  barChartDataPercentage 
}: { 
    barChartDataPercentage: Record<TaskType, 
    { 
      label: string; 
      nb: number; 
      value: number
    }>
  } ) => {

    const colors = {
      task: "#3b82f6",
      story: "hsl(148, 48%, 49%)",
      bug: "hsl(24, 95%, 48%)",
    };

    const workTypeData = Object.entries(barChartDataPercentage).map(
      ([type, data]) => ({
        label: data.label,
        value: data.nb,
        color: colors[type as TaskType],
      })
    );
    
  return <div className="type-work-chart">
    <h4 className="type-work-chart__title">Types of work </h4>
    <BarChart  data={workTypeData} />
  </div>
} 