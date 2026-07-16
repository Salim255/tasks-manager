import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const ProjectIdentitySkeleton = () => (
  <div className="project-header__identity">

    {/* Eyebrow */}
    <SkeletonBase height={20} width={80} viewBox="0 0 80 20">
      <rect x="0" y="0" rx="6" ry="6" width="80" height="16" />
    </SkeletonBase>

    {/* Title */}
    <div className="u-mt-sm">
      <SkeletonBase height={32} width={240} viewBox="0 0 240 32">
        <rect x="0" y="0" rx="8" ry="8" width="240" height="28" />
      </SkeletonBase>
    </div>

  </div>
);
