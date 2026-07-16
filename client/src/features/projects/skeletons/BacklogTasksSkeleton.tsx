import { TaskItemSkeleton } from "./TaskItemSkeleton";
import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const BacklogTasksSkeleton = () => (
  <section className="backlog__content">

    <div className="backlog__tasks">
      <TaskItemSkeleton />
      <TaskItemSkeleton />
      <TaskItemSkeleton />

      <div className="backlog__footer">
        <SkeletonBase height={40} width={140} viewBox="0 0 140 40">
          <rect x="0" y="0" rx="8" ry="8" width="140" height="40" />
        </SkeletonBase>
      </div>
    </div>

  </section>
);
