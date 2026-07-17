import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const ProjectLinkSkeleton = () => {
  return (
    <li className="projects-item projects-item--skeleton">

      <div className="projects-item__link">

        {/* Badge */}
        <span className="projects-item__badge">
          <SkeletonBase height={32} width={32} viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" />
          </SkeletonBase>
        </span>

        {/* Content */}
        <span className="projects-item__content">

          {/* Project name */}
          <SkeletonBase height={18} width={150} viewBox="0 0 150 18">
            <rect x="0" y="0" rx="6" ry="6" width="150" height="14" />
          </SkeletonBase>

          {/* Project key */}
          <div className="u-mt-xs">
            <SkeletonBase height={16} width={80} viewBox="0 0 80 16">
              <rect x="0" y="0" rx="4" ry="4" width="80" height="12" />
            </SkeletonBase>
          </div>

        </span>

      </div>

    </li>
  );
};