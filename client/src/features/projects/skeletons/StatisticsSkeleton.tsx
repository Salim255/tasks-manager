import { WorkStatusChartSkeleton } from "./WorkStatusChartSkeleton";
import { TypeWorkChartSkeleton } from "./TypeWorkChartSkeleton";

export const StatisticsSkeleton = () => {
  return (
    <section className="statistics">

      <div className="statistics__work-status">
        <WorkStatusChartSkeleton />
      </div>

      <div className="statistics__work-types">
        <TypeWorkChartSkeleton />
      </div>

    </section>
  );
};
