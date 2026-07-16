import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const BoardTaskItemSkeleton = () => (
  <div className="board-task-item board-task-item--skeleton">
    <SkeletonBase height={80} width={"100%"} viewBox="0 0 300 80">
      {/* Title */}
      <rect x="0" y="0" rx="8" ry="8" width="70%" height="20" />

      {/* Description */}
      <rect x="0" y="30" rx="6" ry="6" width="90%" height="16" />

      {/* Footer */}
      <rect x="0" y="60" rx="6" ry="6" width="40%" height="14" />
    </SkeletonBase>
  </div>
);
