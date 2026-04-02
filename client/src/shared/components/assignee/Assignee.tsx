import { useMemo } from "react";
import { GoPerson } from "react-icons/go";
import { useProfileSelector } from "../../../features/profile/states/profileSelectors";
import { useMemberSelector } from "../../../features/projects/states/memberSelectors";
import { getInitialsFromProfile } from "../../utils/methods";

export const Assignee = ({assigneeId}: { assigneeId: string | undefined}) => {
    const { profile } = useProfileSelector();
    const { members } =  useMemberSelector();
  
    const assignedProfile  = useMemo(() => {
        if (!assigneeId) return undefined;
        if (assigneeId === profile?.userId) return profile;
        return members.find(member => member.userId === assigneeId)?.profile;
    }, [assigneeId, members, profile]);

    return <div className="assignee">
        <GoPerson /> { assignedProfile ? getInitialsFromProfile(assignedProfile) : 'unassigned' }
    </div>
}