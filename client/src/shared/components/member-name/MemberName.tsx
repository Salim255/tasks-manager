import type { Profile } from "../../../features/profile/model/profile.model";

export const MemberName = ({ profile }: { profile: Profile }) => {
    return <div className="member-name">
        {profile.firstName} {profile.lastName}
    </div>
}