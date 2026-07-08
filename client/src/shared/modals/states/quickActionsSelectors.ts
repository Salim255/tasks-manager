import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";


const selectQuickActionIsOpen = () =>  (state: RootState) => state.quickActionReducer.isOpen;


export const useQuickActionIsOpen = () => useSelector(selectQuickActionIsOpen);
