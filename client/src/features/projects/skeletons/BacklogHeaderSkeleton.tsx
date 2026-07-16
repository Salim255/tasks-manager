import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const BacklogHeaderSkeleton = () => (
  <header className="backlog__header">

    <div className="backlog__header-left">

      {/* Backlog title */}
      <SkeletonBase height={24} width={100} viewBox="0 0 100 24">
        <rect x="0" y="0" rx="6" ry="6" width="100" height="20" />
      </SkeletonBase>

      {/* Count */}
      <div className="u-ml-sm">
        <SkeletonBase height={20} width={40} viewBox="0 0 40 20">
          <rect x="0" y="0" rx="6" ry="6" width="40" height="16" />
        </SkeletonBase>
      </div>

      {/* "work items" */}
      <div className="u-ml-sm">
        <SkeletonBase height={20} width={80} viewBox="0 0 80 20">
          <rect x="0" y="0" rx="6" ry="6" width="80" height="16" />
        </SkeletonBase>
      </div>

    </div>

    {/* Create sprint button */}
    <SkeletonBase height={40} width={140} viewBox="0 0 140 40">
      <rect x="0" y="0" rx="8" ry="8" width="140" height="40" />
    </SkeletonBase>

  </header>
);
