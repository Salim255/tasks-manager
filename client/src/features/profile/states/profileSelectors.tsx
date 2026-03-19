import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const selector = (state: RootState) =>  state.profileReducer;
export const useProfileSelector = () => {
    const profile = useSelector(selector).profile;
    return { profile }
}