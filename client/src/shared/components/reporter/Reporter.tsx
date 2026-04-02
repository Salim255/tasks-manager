import './_reporter.scss';
import { useMemo } from "react";
import { useProfileSelector } from "../../../features/profile/states/profileSelectors";
import { useMemberSelector } from "../../../features/projects/states/memberSelectors";
import { MemberInitial } from "../member-initial/MemberInitial";
import { MemberName } from '../member-name/MemberName';

export const Reporter = ({ reporterId }:{ reporterId: string }) => {
    const {profile} = useProfileSelector();
    const {members} =  useMemberSelector();

    const isReporter = reporterId === profile?.userId;

    const reporterProfile = useMemo(() => {
        if (isReporter) return profile;
        return members.find(m => m.userId === reporterId)?.profile;
    }, [isReporter, profile, members, reporterId]);

    return <div className="reporter">
        <MemberInitial profile={reporterProfile}/>
        <MemberName profile={reporterProfile!}/>
    </div>
}