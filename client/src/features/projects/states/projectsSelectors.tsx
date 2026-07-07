import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const selectProjects = (store: RootState) => store.projectReducer.projects; 
const selectActiveProject = (store: RootState) => store.projectReducer.activeProject; 
const selectDashboardView = (store: RootState) => store.projectReducer.dashboardView;
const selectIsFetchingDashboard = (store: RootState) => store.projectReducer.isFetchingDashboard;

export const useIsFetchingDashboard = () => useSelector(selectIsFetchingDashboard);
export const useDashboardView = () => useSelector(selectDashboardView);
export const useActiveProject = () => useSelector(selectActiveProject);
export const useSelectProjects = () => useSelector(selectProjects);