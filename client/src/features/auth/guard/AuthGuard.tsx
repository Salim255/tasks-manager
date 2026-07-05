import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../states/authSelectors";

export const AuthGuard = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = useIsAuthenticated();
  
  console.log("Hell from auth guard", children , isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return  children;
};