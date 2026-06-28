import './_member-name.scss';
import type { Profile } from "../../../features/profile/model/profile.model";

export const MemberName = ({ profile }: { profile: Profile }) => {
    const safeName = profile?.lastName ? `${profile?.firstName} ${profile?.lastName}` : "Unassigned";
    return <div className="member-name">
        {safeName}
    </div>
}