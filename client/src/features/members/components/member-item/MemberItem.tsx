import { useEffect, useMemo } from "react";
import { useMemberSelector } from "../../states/memberSelectors";
import type { Member } from "../../models/member.model";
import { useProfileSelector } from "../../../profile/states/profileSelectors";

import { getInitialsFromProfile } from "../../../../shared/utils/methods";
import type { Profile } from "../../../profile/model/profile.model";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../../../redux/store";
import type { Task } from "../../../tasks/models/task.model";
import { updateTasHttp } from "../../../tasks/http/task.http";

export const MemberItem = ({ task }: { task: Task }) => {
    const { members } = useMemberSelector();
    const {profile} = useProfileSelector();   
    const dispatch = useDispatch<AppDispatch>();
    const isReporter = task.reporterId === profile?.userId;

    const reporterProfile = useMemo(() => {
        if (isReporter) return profile;
        return members.find(m => m.userId === task.reporterId)?.profile;
    }, [isReporter, profile, members, task.reporterId]);

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
        <ul className="member-item">
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