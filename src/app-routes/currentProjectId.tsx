import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

export const  ProjectsIndexRedirect = ()  => {
  const {projects, activeProjectId } = useSelector((store:RootState) => store.projectReducer);

  const defaultProjectId =
    activeProjectId ?? projects[0]?.id;

  if (!defaultProjectId) {
    // Optional: empty state handling
    return <Navigate to="/projects/empty" replace />;
  }

  console.log(activeProjectId, "hello 🛑🛑");
  return <Navigate to={`${activeProjectId}/board`} replace />;
}
