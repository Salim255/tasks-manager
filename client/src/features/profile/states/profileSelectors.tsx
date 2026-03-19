import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { Profile } from "../model/profile.model";

const selector = (state: RootState) =>  state.profileReducer;
export const useProfileSelector = () => {
    const profile: Profile | undefined = useSelector(selector).profile;
    return { profile }
}