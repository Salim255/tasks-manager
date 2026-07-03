import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";
import { useProfileSelector } from "../../profile/states/profileSelectors";

export const ProtectedRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const { isProfileLoading } = useProfileSelector();

  if (isAuthenticated === undefined || isProfileLoading) {
    return <div>Loading auth...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return  <Outlet />

};