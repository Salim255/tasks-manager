import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

export const HeroStatsSkeleton = () => {
  return (
    <div className="projects-home__hero-stats">

      {[1, 2, 3].map((i) => (
        <article key={i} className="projects-home__stat-card">

          <SkeletonBase height={16} width={120} viewBox="0 0 120 16">
            <rect x="0" y="0" rx="6" ry="6" width="120" height="12" />
          </SkeletonBase>

          <div className="u-mt-xs">
            <SkeletonBase height={28} width={80} viewBox="0 0 80 28">
              <rect x="0" y="0" rx="8" ry="8" width="80" height="24" />
            </SkeletonBase>
          </div>

          <div className="u-mt-xs">
            <SkeletonBase height={14} width={140} viewBox="0 0 140 14">
              <rect x="0" y="0" rx="4" ry="4" width="140" height="10" />
            </SkeletonBase>
          </div>

        </article>
      ))}

    </div>
  );
};
