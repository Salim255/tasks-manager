import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  return <Outlet />;
};
