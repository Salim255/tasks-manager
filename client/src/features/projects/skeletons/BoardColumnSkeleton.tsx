import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";
import { BoardTaskItemSkeleton } from "./BoardTaskItemSkeleton";

export const BoardColumnSkeleton = () => {
  return (
    <div className="board-column board-column--skeleton">

      {/* HEADER */}
      <div className="board-column__header">

        <div className="board-column__title-group">

          {/* Indicator */}
          <SkeletonBase height={16} width={16} viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </SkeletonBase>

          {/* Title */}
          <div className="u-ml-sm">
            <SkeletonBase height={24} width={120} viewBox="0 0 120 24">
              <rect x="0" y="0" rx="6" ry="6" width="120" height="20" />
            </SkeletonBase>
          </div>

        </div>

        {/* Count */}
        <SkeletonBase height={20} width={30} viewBox="0 0 30 20">
          <rect x="0" y="0" rx="6" ry="6" width="30" height="16" />
        </SkeletonBase>

      </div>

      {/* BODY */}
      <div className="board-column__body">
        <BoardTaskItemSkeleton />
        <BoardTaskItemSkeleton />
        <BoardTaskItemSkeleton />
      </div>

    </div>
  );
};
