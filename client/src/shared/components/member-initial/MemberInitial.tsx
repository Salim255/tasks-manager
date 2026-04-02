import './_member-initial.scss';
import { GoPerson } from "react-icons/go";
import { getInitialsFromProfile } from "../../utils/methods";
import type { Profile } from "../../../features/profile/model/profile.model";

export const MemberInitial = ({ profile }: {profile?: Profile}) => {
    return(
        <div className={`member-initial ${profile ? 'member-initial--with-profile' : ''}`}>
            { 
                profile
                ? 
                <span className='member-initial__initial'> 
                    { getInitialsFromProfile(profile) } 
                </span> 
                : <GoPerson className='member-initial__icon'/> 
            }
        </div>
    )
}