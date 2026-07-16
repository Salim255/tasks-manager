import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";

export const AuthGuard = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  return  children;
};