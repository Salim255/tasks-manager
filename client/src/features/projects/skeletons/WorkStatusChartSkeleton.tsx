import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const WorkStatusChartSkeleton = () => {
  return (
    <div className="work-status-chart">

      {/* Title */}
      <SkeletonBase height={28} width={160} viewBox="0 0 160 28">
        <rect x="0" y="0" rx="8" ry="8" width="160" height="24" />
      </SkeletonBase>

      {/* Pie chart */}
      <div className="u-mt-lg">
        <SkeletonBase height={200} width={200} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" />
        </SkeletonBase>
      </div>

    </div>
  );
};
