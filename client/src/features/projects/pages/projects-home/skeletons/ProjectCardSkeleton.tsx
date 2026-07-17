import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const ProjectCardSkeleton = () => {
  return (
    <article className="projects-home__project-card projects-home__project-card--skeleton">

      <div className="projects-home__project-top">
        <SkeletonBase height={40} width={40} viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" />
        </SkeletonBase>

        <div className="u-ml-sm">
          <SkeletonBase height={20} width={160} viewBox="0 0 160 20">
            <rect x="0" y="0" rx="6" ry="6" width="160" height="16" />
          </SkeletonBase>

          <div className="u-mt-xs">
            <SkeletonBase height={14} width={100} viewBox="0 0 100 14">
              <rect x="0" y="0" rx="4" ry="4" width="100" height="10" />
            </SkeletonBase>
          </div>
        </div>
      </div>

      <div className="projects-home__project-progress u-mt-md">
        <SkeletonBase height={16} width={200} viewBox="0 0 200 16">
          <rect x="0" y="0" rx="6" ry="6" width="200" height="12" />
        </SkeletonBase>

        <div className="projects-home__progress-bar u-mt-xs">
          <SkeletonBase height={8} width={"100%"} viewBox="0 0 300 8">
            <rect x="0" y="0" rx="4" ry="4" width="300" height="8" />
          </SkeletonBase>
        </div>
      </div>

      <div className="projects-home__project-footer u-mt-md">
        <SkeletonBase height={16} width={120} viewBox="0 0 120 16">
          <rect x="0" y="0" rx="6" ry="6" width="120" height="12" />
        </SkeletonBase>

        <div className="u-ml-sm">
          <SkeletonBase height={14} width={80} viewBox="0 0 80 14">
            <rect x="0" y="0" rx="4" ry="4" width="80" height="10" />
          </SkeletonBase>
        </div>
      </div>

    </article>
  );
};
