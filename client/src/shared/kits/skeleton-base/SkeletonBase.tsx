import ContentLoader from "react-content-loader";

export const SkeletonBase = (props) => (
  <ContentLoader
    speed={1.4}
    backgroundColor="var(--surface-secondary)"
    foregroundColor="var(--surface)"
    {...props}
  >
    {props.children}
  </ContentLoader>
);
