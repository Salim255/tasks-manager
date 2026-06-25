import './_assignee.scss';
import { useMemo } from "react";
import { useProfileSelector } from "../../../features/profile/states/profileSelectors";
import { useMemberSelector } from "../../../features/members/states/memberSelectors";
import { MemberInitial } from '../member-initial/MemberInitial';
import { MemberName } from '../member-name/MemberName';

export const Assignee = ({
    assigneeId,
    pageName,
}: { 
    assigneeId: string | undefined;
    pageName?: string 
}) => {
    const { profile } = useProfileSelector();
    const { members } =  useMemberSelector();
  
    const assignedProfile  = useMemo(() => {
        if (!assigneeId) return undefined;
        if (assigneeId === profile?.userId) return profile;
        return members.find(member => member.userId === assigneeId)?.profile;
    }, [assigneeId, members, profile]);

    return (
        <div className="assignee">
            <MemberInitial profile={assignedProfile} />

            {pageName && (
            <span className="assignee__name">
                {assignedProfile ? (
                <MemberName profile={assignedProfile} />
                ) : (
                "Unassigned"
                )}
            </span>
            )}
        </div>
    );
}