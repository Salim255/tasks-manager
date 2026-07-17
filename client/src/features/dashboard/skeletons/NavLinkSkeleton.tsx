const NavLinkSkeleton = () => (
  <div className="nav-links__nav-link nav-links__nav-link--skeleton">

    {/* Icon */}
    <SkeletonBase height={24} width={24} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
    </SkeletonBase>

    {/* Text */}
    <div className="u-ml-sm">
      <SkeletonBase height={20} width={120} viewBox="0 0 120 20">
        <rect x="0" y="0" rx="6" ry="6" width="120" height="16" />
      </SkeletonBase>
    </div>

  </div>
);
