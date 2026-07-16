import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const TableHeaderSkeleton = () => {
  return (
    <div className="data-table__header">

      {/* Checkbox */}
      <SkeletonBase height={20} width={20} viewBox="0 0 20 20">
        <rect x="0" y="0" rx="4" ry="4" width="20" height="20" />
      </SkeletonBase>

      {/* Task */}
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>

      {/* Description */}
      <SkeletonBase height={20} width={160} viewBox="0 0 160 20">
        <rect x="0" y="0" rx="6" ry="6" width="160" height="16" />
      </SkeletonBase>

      {/* Reporter */}
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>

      {/* Priority */}
      <SkeletonBase height={20} width={80} viewBox="0 0 80 20">
        <rect x="0" y="0" rx="6" ry="6" width="80" height="16" />
      </SkeletonBase>

      {/* Status */}
      <SkeletonBase height={20} width={80} viewBox="0 0 80 20">
        <rect x="0" y="0" rx="6" ry="6" width="80" height="16" />
      </SkeletonBase>

      {/* Resolution */}
      <SkeletonBase height={20} width={80} viewBox="0 0 80 20">
        <rect x="0" y="0" rx="6" ry="6" width="80" height="16" />
      </SkeletonBase>

      {/* Assignee */}
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>

      {/* updated at */}
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>

      {/* due date */}
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>

      {/* created at */}
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>

    </div>
  );
};
