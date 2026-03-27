import { useEffect } from "react";
import { useMemberSelector } from "../../states/memberSelectors";

export const MemberItem = () => {
    const {members} = useMemberSelector();
    
    useEffect(() => {}, [members]);

    if (!members.length) return;

    return members.map((m) => {
        return <li key={m.id}> { m.profile.firstName } { m.profile.lastName } </li>
    })
}