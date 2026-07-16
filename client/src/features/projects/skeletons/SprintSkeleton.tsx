import { BoardTaskItemSkeleton } from "./BoardTaskItemSkeleton";
import { SprintHeaderSkeleton } from "./SprintHeaderSkeleton";
import { SkeletonBase } from "../../../shared/kits/skeleton-base/SkeletonBase";

export const SprintSkeleton = () => {
  return (
    <section className="sprint sprint--skeleton">

      <SprintHeaderSkeleton />

      <div className="sprint__tasks">
        <BoardTaskItemSkeleton />
        <BoardTaskItemSkeleton />
        <BoardTaskItemSkeleton />
      </div>

      <footer className="sprint__footer">
        <SkeletonBase height={40} width={140} viewBox="0 0 140 40">
          <rect x="0" y="0" rx="8" ry="8" width="140" height="40" />
        </SkeletonBase>
      </footer>

    </section>
  );
};
