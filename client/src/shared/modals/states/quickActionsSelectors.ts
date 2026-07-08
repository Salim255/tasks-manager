import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";


const selectQuickActionIsOpen = (state: RootState) => state.quickActionReducer.isOpen;
const selectQuickActionType = (state: RootState) => state.quickActionReducer.type;

export const useQuickActionType = () => useSelector(selectQuickActionType);
export const useQuickActionIsOpen = () => useSelector(selectQuickActionIsOpen);
