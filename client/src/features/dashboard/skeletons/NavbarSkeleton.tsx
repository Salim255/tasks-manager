import { NavLinkSkeleton } from "./NavLinkSkeleton";
import { ProjectLinkSkeleton } from "./ProjectLinkSkeleton";

export const NavbarSkeleton = () => {
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
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
        <ProjectLinkSkeleton />
      </div>
      <NavLinkSkeleton />
      <NavLinkSkeleton />
      <NavLinkSkeleton />
      <NavLinkSkeleton />
    </div>
  );
};
