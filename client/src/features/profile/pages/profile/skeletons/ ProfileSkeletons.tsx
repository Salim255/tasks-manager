import { SkeletonBase } from "../../../../../shared/kits/skeleton-base/SkeletonBase";

import ContentLoader from "react-content-loader";

export const ProfileHeroSkeleton = () => {
  return (
    <div className="profile-hero">

      {/* Avatar skeleton */}
      <div className="profile-hero__avatar">
        <ContentLoader
          speed={1.4}
          backgroundColor="var(--surface-secondary)"
          foregroundColor="var(--surface)"
          width={120}
          height={120}
          viewBox="0 0 120 120"
        >
          <circle cx="60" cy="60" r="50" />
        </ContentLoader>
      </div>

      {/* Name skeleton */}
      <div className="profile-hero__name u-mt-xl">
        <ContentLoader
          speed={1.4}
          backgroundColor="var(--surface-secondary)"
          foregroundColor="var(--surface)"
          width={240}
          height={40}
          viewBox="0 0 240 40"
        >
          <rect x="0" y="0" rx="8" ry="8" width="240" height="28" />
        </ContentLoader>
      </div>

    </div>
  );
};



export const SectionTitleSkeleton = () => (
  <SkeletonBase height={30}>
    <rect x="0" y="0" rx="8" ry="8" width="30%" height="30" />
  </SkeletonBase>
);

export const SecurityItemSkeleton = () => (
  <SkeletonBase height={40}>
    <rect x="0" y="0" rx="6" ry="6" width="40%" height="18" />
    <rect x="0" y="25" rx="6" ry="6" width="20%" height="16" />
  </SkeletonBase>
);


export const ProfileItemSkeleton = () => (
  <SkeletonBase height={50}>
    {/* Label */}
    <rect x="0" y="0" rx="6" ry="6" width="30%" height="16" />

    {/* Value */}
    <rect x="0" y="25" rx="6" ry="6" width="60%" height="18" />
  </SkeletonBase>
);


export const ProfileSkeleton = () => {
  return (
    <section className="profile u-p-2xl">
      <div className="profile__container">

        {/* HERO */}
        <div className="profile__hero u-mb-xl">
          <ProfileHeroSkeleton />
        </div>

        {/* ACCOUNT OVERVIEW */}
        <div className="profile__section profile__overview u-mb-xl">
          <SectionTitleSkeleton />

          <div className="profile__grid u-mt-lg">
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
            <ProfileItemSkeleton />
          </div>
        </div>

        {/* SECURITY */}
        <div className="profile__section profile__security">
          <SectionTitleSkeleton />

          <div className="profile__security-list u-mt-lg">
            <SecurityItemSkeleton />
          </div>
        </div>

      </div>
    </section>
  );
};