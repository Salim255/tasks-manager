import { useMemo } from "react";
import { useProfileSelector } from "../../profile/states/profileSelectors";
import { useMemberSelector } from "../states/memberSelectors";

export const useMemberOptions = () => {
    const { members } = useMemberSelector();
    const { profile } = useProfileSelector();

    return useMemo(() => {
        return [
            {
                label: "unassigned",
                value: "unassigned",
            },

            ...(profile
                ? [{
                    label: `${profile.firstName} ${profile.lastName} (me)`,
                    value: profile.userId,
                }]
                : []),

            ...members
                .filter(m => m.userId !== profile?.userId)
                .map(m => ({
                    label: `${m.profile.firstName} ${m.profile.lastName}`,
                    value: m.userId,
                })),
        ];
    }, [members, profile]);
};