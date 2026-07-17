import React from "react";
import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const HomeTaskItemSkeleton: React.FC = () => {
  return (
    <article className="projects-home__task-item projects-home__task-item--skeleton">

      <SkeletonBase height={20} width={20} viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" />
      </SkeletonBase>

      <div className="projects-home__task-content u-ml-sm">
        <SkeletonBase height={18} width={160} viewBox="0 0 160 18">
          <rect x="0" y="0" rx="6" ry="6" width="160" height="14" />
        </SkeletonBase>

        <div className="u-mt-xs">
          <SkeletonBase height={14} width={120} viewBox="0 0 120 14">
            <rect x="0" y="0" rx="4" ry="4" width="120" height="10" />
          </SkeletonBase>
        </div>
      </div>

    </article>
  );
};
