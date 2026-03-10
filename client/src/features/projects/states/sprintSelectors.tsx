import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export const selectSprints = (store: RootState) => store.sprintReducer;
export const useSprintSelector = () => useSelector(selectSprints);