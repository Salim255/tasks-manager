import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";
import { useEffect } from "react";
import { useProfileSelector } from "../../profile/states/profileSelectors";

export const ProtectedRoutes = () => {
    const isAuthenticated = useIsAuthenticated();
    const { profile, isProfileLoading } = useProfileSelector();
    const navigate = useNavigate();

    // Dynamic redirects after mount
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth", { replace: true });
            return;
        }

      /*   if(!isProfileLoading && !profile) {
            navigate("/profile", { replace: true });
        } */
        
    },[ isAuthenticated, profile, navigate, isProfileLoading ]);

    // Render-time guards
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }
  /*   if (!isProfileLoading && !profile) {
        return <Navigate to="/profile" replace />;
    }
 */
    return <Outlet />;
};