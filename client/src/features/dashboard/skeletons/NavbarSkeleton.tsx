import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const AsideNavbarSkeleton = () => {
  return (
    <div className="nav-links u-p-xl nav-links--skeleton">

      {/* Main nav links */}
      <NavLinkSkeleton />
      <NavLinkSkeleton />
      <NavLinkSkeleton />
      <NavLinkSkeleton />

      {/* Projects list skeleton (collapsed version) */}
      <div className="nav-links__projects nav-links__projects--skeleton u-mt-md">
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
      </div>

    </div>
  );
};
