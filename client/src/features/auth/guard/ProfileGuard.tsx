import type React from "react";
import { useProfileSelector } from "../../profile/states/profileSelectors";

export const ProfileGuard = ({ children }: { children: React.ReactNode }) => {
    const { profile, isProfileLoading } = useProfileSelector();

    if (!profile && isProfileLoading ) return <div>Loading Spinner</div>

    if (!profile && !isProfileLoading ) return <div>God to profile create</div>

    if (profile && !isProfileLoading ) return children
}