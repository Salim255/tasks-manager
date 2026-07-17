import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const AssignedToMePanelSkeleton = () => {
  return (
    <section className="projects-home__panel">

      <div className="projects-home__panel-header">
        <SkeletonBase height={24} width={180} viewBox="0 0 180 24">
          <rect x="0" y="0" rx="6" ry="6" width="180" height="20" />
        </SkeletonBase>

        <div className="u-mt-xs">
          <SkeletonBase height={16} width={240} viewBox="0 0 240 16">
            <rect x="0" y="0" rx="4" ry="4" width="240" height="12" />
          </SkeletonBase>
        </div>
      </div>

      <div className="projects-home__tasks-list u-mt-md">
        <TaskItemSkeleton />
        <TaskItemSkeleton />
        <TaskItemSkeleton />
      </div>

    </section>
  );
};
