import { useMemo } from "react";
import { useProfileSelector } from "../../../features/profile/states/profileSelectors";
import { useMemberSelector } from "../../../features/projects/states/memberSelectors";
import { getInitialsFromProfile } from "../../utils/methods";

export const Reporter = ({ reporterId }:{ reporterId: string }) => {
    const {profile} = useProfileSelector();
    const {members} =  useMemberSelector();

    const isReporter = reporterId === profile?.userId;

    const reporterProfile = useMemo(() => {
        if (isReporter) return profile;
        return members.find(m => m.userId === reporterId)?.profile;
    }, [isReporter, profile, members, reporterId]);

    return <div>
        <span>{ getInitialsFromProfile(reporterProfile) }</span>
        {reporterProfile?.firstName} {reporterProfile?.lastName}
    </div>
}