import type { TaskType } from "../../../../models/task.model";
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

    const workTypeData = [
  {
    label: "Tasks",
    value: 478,
    color: "#3b82f6",
  },
  {
    label: "Stories",
    value: 295,
    color: "hsl(148, 48%, 49%)",
  },
  {
    label: "Bugs",
    value: 254,
    color: "hsl(24, 95%, 48%)",
  },
];
  return <div className="type-work-chart">
    <h4 className="type-work-chart__title">Types of work </h4>
    <BarChart  data={workTypeData} />
  </div>
} 