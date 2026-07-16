export const SprintHeaderSkeleton = () => (
  <header className="sprint__header">

    {/* Sprint title */}
    <SkeletonBase height={24} width={180} viewBox="0 0 180 24">
      <rect x="0" y="0" rx="6" ry="6" width="180" height="20" />
    </SkeletonBase>

    {/* Sprint date range */}
    <div className="u-mt-sm">
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>
    </div>

  </header>
);
