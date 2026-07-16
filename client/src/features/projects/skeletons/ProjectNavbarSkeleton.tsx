import { ProjectActionsSkeleton } from "./ProjectActionsSkeleton";
import { ProjectNavigationSkeleton } from "./ProjectNavigationSkeleton";
import { ProjectIdentitySkeleton } from "./ProjectIdentitySkeleton";

export const ProjectNavbarSkeleton = () => {
  return (
    <header className="project-header">

      {/* ============================
          TOP SECTION SKELETON
      ============================ */}
      <div className="project-header__top">

        <ProjectIdentitySkeleton />
        <ProjectActionsSkeleton />

      </div>

      {/* ============================
          NAVIGATION SECTION SKELETON
      ============================ */}
      <div className="project-header__bottom">
        <ProjectNavigationSkeleton />
      </div>

    </header>
  );
};
