import ContentLoader, { type IContentLoaderProps } from "react-content-loader";

export const SkeletonBase = (props:  IContentLoaderProps) => (
  <ContentLoader
    speed={1.4}
    backgroundColor="var(--surface-secondary)"
    foregroundColor="var(--surface)"
    {...props}
  >
    {props.children}
  </ContentLoader>
);

export const SkeletonText = () => (
  <SkeletonBase height={16}>
    <rect x="0" y="0" rx="6" ry="6" width="100%" height="16" />
  </SkeletonBase>
);

export const SkeletonTitle = () => (
  <SkeletonBase height={30}>
    <rect x="0" y="0" rx="8" ry="8" width="60%" height="30" />
  </SkeletonBase>
);

export const SkeletonAvatar = () => (
  <SkeletonBase height={48} width={48}>
    <circle cx="24" cy="24" r="24" />
  </SkeletonBase>
);

export const SkeletonCard = () => (
  <SkeletonBase height={120}>
    <rect x="0" y="0" rx="12" ry="12" width="100%" height="120" />
  </SkeletonBase>
);
