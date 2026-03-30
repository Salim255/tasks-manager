import type { Profile } from '../../../../model/profile.model';
import './_profile-hero.scss';

export const ProfileHero = ({ profile }: { profile: Profile }) => {
    return <div  className='profile-hero'>
        <img 
        src='/assets/images/default-profile.jpg' 
        alt='hero'/>

        <div>
             { profile!.firstName } { profile!.lastName }
        </div>
    </div>
}