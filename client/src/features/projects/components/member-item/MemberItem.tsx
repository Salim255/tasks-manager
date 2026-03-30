import { useEffect } from "react";
import { useMemberSelector } from "../../states/memberSelectors";
import type { Member } from "../../models/member.model";

export const MemberItem = () => {
    const { members } = useMemberSelector();
    
    useEffect(() => {}, [members]);

    console.log(members);
    const handleAssignMember = ( member: Member) => {
        console.log(member);
    }

    if (!members.length) return;

    return members.map((m) => {
        return (
            <li 
                onClick={() => handleAssignMember(m)}
                key={m.id}>
                { m.profile.firstName } { m.profile.lastName }
            </li>
        )
    })
}