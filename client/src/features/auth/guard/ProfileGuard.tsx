import type React from "react";
import { useProfileSelector } from "../../profile/states/profileSelectors";
import { Navigate } from "react-router-dom";

export const ProfileGuard = ({ children }: { children: React.ReactNode }) => {
    const { profile, isProfileLoading } = useProfileSelector();
    if (isProfileLoading ) return <div>Loading Spinner</div>
    
    
    if (!profile) {
        return <Navigate to="profile/create-profile" replace/>;
    }

    if (profile ) return children;
}