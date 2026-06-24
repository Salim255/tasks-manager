import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";


export const selectTasks = (store: RootState) => store.taskSlice;
export const useTasksSelector = () => useSelector(selectTasks);