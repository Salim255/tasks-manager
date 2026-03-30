import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";

export const ProtectedRoutes = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};