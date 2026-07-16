export const TypeWorkChartSkeleton = () => {
  return (
    <div className="type-work-chart">

      {/* Title */}
      <SkeletonBase height={28} width={180} viewBox="0 0 180 28">
        <rect x="0" y="0" rx="8" ry="8" width="180" height="24" />
      </SkeletonBase>

      {/* Bar chart */}
      <div className="u-mt-lg">
        <SkeletonBase height={200} width={300} viewBox="0 0 300 200">
          {/* Bars */}
          <rect x="20" y="150" rx="6" ry="6" width="40" height="40" />
          <rect x="80" y="120" rx="6" ry="6" width="40" height="70" />
          <rect x="140" y="90" rx="6" ry="6" width="40" height="100" />
          <rect x="200" y="60" rx="6" ry="6" width="40" height="130" />
          <rect x="260" y="110" rx="6" ry="6" width="40" height="80" />
        </SkeletonBase>
      </div>

    </div>
  );
};
