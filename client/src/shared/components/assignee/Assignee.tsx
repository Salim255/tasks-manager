import './_assignee.scss';
import { useMemo } from "react";
import { GoPerson } from "react-icons/go";
import { useProfileSelector } from "../../../features/profile/states/profileSelectors";
import { useMemberSelector } from "../../../features/projects/states/memberSelectors";
import { getInitialsFromProfile } from "../../utils/methods";

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

    return <div className="assignee">
       <div className="assignee__initials-container">
            { 
                assignedProfile 
                ? 
                <span className='assignee__initial'> { getInitialsFromProfile(assignedProfile) } </span> 
                : <GoPerson className='assignee__icon'/> 
            }
           
        </div> 
        {
            pageName &&  
            <div className={`assignee__name`}>
                { 
                    assignedProfile 
                    ? `${assignedProfile.firstName} ${assignedProfile.lastName}` 
                    : 'unassigned'
                }
            </div>
        }
    </div>
}