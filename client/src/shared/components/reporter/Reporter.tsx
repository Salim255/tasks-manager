import { useProfileSelector } from "../../../features/profile/states/profileSelectors";

export const Reporter = ({ reporterId }:{ reporterId: string }) => {
    const {profile} = useProfileSelector();
    const getInitials = () => {
        return profile?.firstName?.trim()[0].concat(profile?.lastName?.trim()[0]);
    }
    return <div>
        <span>{getInitials()}</span> { profile?.firstName } { profile?.lastName }
    </div>
}