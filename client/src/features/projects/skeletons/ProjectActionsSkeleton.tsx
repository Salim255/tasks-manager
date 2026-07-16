import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const ProjectActionsSkeleton = () => (
  <div className="project-header__actions">
    <SkeletonBase height={40} width={120} viewBox="0 0 120 40">
      <rect x="0" y="0" rx="8" ry="8" width="120" height="40" />
    </SkeletonBase>
  </div>
);
