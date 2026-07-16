import { SprintSkeleton } from "./SprintSkeleton";
import { BacklogHeaderSkeleton } from "./BacklogHeaderSkeleton";
import { BacklogTasksSkeleton } from "./BacklogTasksSkeleton";

export const BacklogSkeleton = () => {
  return (
    <section className="backlog-container scroll-bar">

      <div className="backlog-container__separator" />

      {/* SPRINTS */}
      <section className="backlog-container__sprints">
        <SprintSkeleton />
        <SprintSkeleton />
        <SprintSkeleton />
      </section>

      <div className="backlog-container__separator" />

      {/* BACKLOG */}
      <section className="backlog">
        <BacklogHeaderSkeleton />
        <BacklogTasksSkeleton />
      </section>

      <div className="backlog-container__separator" />

    </section>
  );
};
