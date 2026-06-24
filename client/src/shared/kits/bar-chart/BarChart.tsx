import "./_bar-chart.scss";
import type { TaskType } from "../../../features/projects/models/task.model";
import { ResponsiveBar } from "@nivo/bar";

export const BarChart = ({ 
    barChartDataPercentage,
 }: { 
    barChartDataPercentage: Record<TaskType, { label: string; nb: number; value: number }>,
}) => {
const data = [
  {
    type: "Tasks",
    count: 478,
    color: "#3b82f6",
  },
  {
    type: "Stories",
    count: 295,
    color: "hsl(148, 48%, 49%)",
  },
  {
    type: "Bugs",
    count: 254,
    color: "hsl(24, 95%, 48%)",
  },
];
    return <div className="bar-char">
  <ResponsiveBar
    data={data}
    keys={[
      "count"
    ]}
    indexBy="type"
    colors={({ data }) => data.color}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    labelSkipWidth={12}
    labelSkipHeight={12}   
    padding={0.4}
    labelTextColor={{
      from: "color",
      modifiers: [["brighter", 3]],
    }}
  />
    </div>
}