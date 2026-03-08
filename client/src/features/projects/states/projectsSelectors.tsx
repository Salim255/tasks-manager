import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const selectProjects = (store: RootState) => store.projectReducer.projects; 
export const useSelectProjects = () => useSelector(selectProjects);