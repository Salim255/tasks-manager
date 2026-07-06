import type { TaskType } from "../../../../../tasks/models/task.model";
import { BarChart } from "../../../../../../shared/kits/bar-chart/BarChart";
import "./_type-work-chart.scss";

export const TypeWorkChart = ({
  barChartDataPercentage,
}: {
  barChartDataPercentage: Record<
    TaskType,
    {
      label: string;
      nb: number;
      value: number;
    }
  >;
}) => {
  const colors: Record<TaskType, string> = {
    task: "var(--task-color)",
    story: "var(--story-color)",
    bug: "var(--bug-color)",
  };

  const hasData = barChartDataPercentage &&
    Object.values(barChartDataPercentage).some((d) => d.nb > 0);

  const workTypeData = Object.entries(barChartDataPercentage || {}).map(
    ([type, data]) => ({
      label: data.label,
      value: data.nb,
      color: colors[type as TaskType],
    })
  );

  return (
    <div className="type-work-chart">
      <h4 className="type-work-chart__title">Types of work</h4>

      {hasData ? (
        <BarChart data={workTypeData} />
      ) : (
        <div className="type-work-chart__empty">
          <span>No work items yet</span>
        </div>
      )}
    </div>
  );
};