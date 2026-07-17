import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const HeroSectionSkeleton = () => {
  return (
    <section className="projects-home__hero">
      <div className="projects-home__hero-content">

        <SkeletonBase height={18} width={160} viewBox="0 0 160 18">
          <rect x="0" y="0" rx="6" ry="6" width="160" height="14" />
        </SkeletonBase>

        <div className="u-mt-sm">
          <SkeletonBase height={36} width={260} viewBox="0 0 260 36">
            <rect x="0" y="0" rx="8" ry="8" width="260" height="32" />
          </SkeletonBase>
        </div>

        <div className="u-mt-sm">
          <SkeletonBase height={60} width={380} viewBox="0 0 380 60">
            <rect x="0" y="0" rx="8" ry="8" width="380" height="56" />
          </SkeletonBase>
        </div>

        <div className="projects-home__hero-actions u-mt-md">
          <SkeletonBase height={40} width={140} viewBox="0 0 140 40">
            <rect x="0" y="0" rx="8" ry="8" width="140" height="40" />
          </SkeletonBase>
        </div>

      </div>
    </section>
  );
};
