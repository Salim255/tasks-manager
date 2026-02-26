import { Navigate } from "react-router-dom";

export const  ProjectsIndexRedirect = ()  => {
  // TODO: replace with your real logic:
  // - from state (Redux/Zustand/Context)
  // - from API (fetch first project)
  const defaultProjectId = "1";

  return <Navigate to={`${defaultProjectId}/board`} replace />;
}
