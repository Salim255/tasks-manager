import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";

export const ProtectedRoutes = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return  children

};