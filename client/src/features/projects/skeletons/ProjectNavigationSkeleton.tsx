import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const ProjectNavigationSkeleton = () => (
  <nav className="project-header__nav">

    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="project-header__link project-header__link--skeleton">

        {/* Icon */}
        <SkeletonBase height={24} width={24} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </SkeletonBase>

        {/* Text */}
        <SkeletonBase height={20} width={100} viewBox="0 0 100 20">
          <rect x="0" y="0" rx="6" ry="6" width="100" height="16" />
        </SkeletonBase>

      </div>
    ))}

  </nav>
);
