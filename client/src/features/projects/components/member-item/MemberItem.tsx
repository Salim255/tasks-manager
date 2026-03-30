import { useEffect, useMemo } from "react";
import { useMemberSelector } from "../../states/memberSelectors";
import type { Member } from "../../models/member.model";
import { useProfileSelector } from "../../../profile/states/profileSelectors";
import type { Task } from "../../models/task.model";
import { getInitialsFromProfile } from "../../../../shared/utils/methods";
import type { Profile } from "../../../profile/model/profile.model";
import { useDispatch } from "react-redux";
import { updateTasHttp } from "../../http/task.http";
import type { AppDispatch } from "../../../../redux/store";

export const MemberItem = ({ task }: { task: Task }) => {
    const { members } = useMemberSelector();
    const {profile} = useProfileSelector();   
    const dispatch = useDispatch<AppDispatch>();
    const isReporter = task.ownerId === profile?.userId;

    const reporterProfile = useMemo(() => {
        if (isReporter) return profile;
        return members.find(m => m.userId === task.ownerId)?.profile;
    }, [isReporter, profile, members, task.ownerId]);

    const handleAssignMember = ({
        member,
        type,
    }: { 
        member: Member | Profile | undefined;
        type: string;
    }) => {
        if (!task.id) return;

        switch(type) {
            case "assign-me":
                dispatch(updateTasHttp({
                    taskId: task.id,
                    assigneeId: profile?.userId,
                }));
                return;
            case "unassigned":
                dispatch(updateTasHttp({
                    taskId: task.id,
                    assigneeId: "undefined",
                }));
                return;
            default:
                dispatch(updateTasHttp({
                    taskId: task.id,
                    assigneeId: member?.userId
                }));
        }
    }

    useEffect(() => {}, [members, profile]);
    
    return (
        <ul>
            <li 
                onClick={() => handleAssignMember({
                    member: undefined,
                    type: "unassigned",
                    })} key="unassigned"> 
                unassigned 
            </li>
            <li onClick={() => handleAssignMember({
                member: reporterProfile!,
                type: "assign-me",
                })} key="assign-me">
                { getInitialsFromProfile(reporterProfile)} assign to me 
            </li>
            { members.map(m => (
                <li 
                onClick={() => handleAssignMember({member: m, type: "assign-member"})}
                key={m.id}>
                    { m.profile.firstName } { m.profile.lastName }
                </li>
            ))}
        </ul>
    )
}