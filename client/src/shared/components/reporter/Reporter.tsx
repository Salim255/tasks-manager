import { useProfileSelector } from "../../../features/profile/states/profileSelectors";

export const Reporter = ({ reporterId }:{ reporterId: string }) => {
    const {profile} = useProfileSelector();

    return <div>
        hello from reporter id {reporterId}
    </div>
}