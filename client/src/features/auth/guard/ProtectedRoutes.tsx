import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";
import { useProfileSelector } from "../../profile/states/profileSelectors";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  //const { isProfileLoading } = useProfileSelector();

  console.log("Hello from protected route")
  
 
  useEffect(() => {
    console.log(isAuthenticated, "hello from ^protect")
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return  <Outlet />

};