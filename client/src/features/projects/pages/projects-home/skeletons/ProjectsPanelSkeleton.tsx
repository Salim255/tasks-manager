import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase"

export const ProjectsPanelSkeleton = () => {
  return (
    <section className="projects-home__panel">

      <div className="projects-home__panel-header">
        <div>
          <SkeletonBase height={24} width={180} viewBox="0 0 180 24">
            <rect x="0" y="0" rx="6" ry="6" width="180" height="20" />
          </rect>
          </SkeletonBase>

          <div className="u-mt-xs">
            <SkeletonBase height={16} width={240} viewBox="0 0 240 16">
              <rect x="0" y="0" rx="4" ry="4" width="240" height="12" />
            </SkeletonBase>
          </div>
        </div>

        <SkeletonBase height={20} width={80} viewBox="0 0 80 20">
          <rect x="0" y="0" rx="6" ry="6" width="80" height="16" />
        </SkeletonBase>
     

      <div className="projects-home__projects-list u-mt-md">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>

    </section>
  );
};
