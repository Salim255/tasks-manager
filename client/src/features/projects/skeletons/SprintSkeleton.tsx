import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";
import { SprintHeaderSkeleton } from "./SprintHeaderSkeleton";
import { TaskItemSkeleton } from "./TaskItemSkeleton";

export const SprintSkeleton = () => {
  return (
    <section className="sprint sprint--skeleton">

      <SprintHeaderSkeleton />

      <div className="sprint__tasks">
        <TaskItemSkeleton />
        <TaskItemSkeleton />
        <TaskItemSkeleton />
      </div>

      <footer className="sprint__footer">
        <SkeletonBase height={40} width={140} viewBox="0 0 140 40">
          <rect x="0" y="0" rx="8" ry="8" width="140" height="40" />
        </SkeletonBase>
      </footer>

    </section>
  );
};
