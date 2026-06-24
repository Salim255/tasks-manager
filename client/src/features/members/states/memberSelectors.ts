import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const memberReducer = (state: RootState) =>  state.memberReducer;
export const useMemberSelector = () => useSelector(memberReducer);