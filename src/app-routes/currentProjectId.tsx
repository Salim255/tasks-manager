import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

export const  ProjectsIndexRedirect = ()  => {
  const {projects, activeProjectId } = useSelector((store:RootState) => store.projectReducer);

  const defaultProjectId =
    activeProjectId ?? projects[0]?.id;

  if (!defaultProjectId) {

    return <Navigate to="/projects/empty" replace />;
  }

  return <Navigate to={`${defaultProjectId}/board`} replace />;
}
