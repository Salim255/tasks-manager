import type { Profile } from '../../../../model/profile.model';
import './_profile-hero.scss';

export const ProfileHero = ({ profile }: { profile: Profile }) => {
    return <div  className='profile-hero'>
        <img 
        src='/assets/images/default-profile.jpg' 
        alt='hero'/>

        <h1 className='profile-hero__name heading-primary u-mt-xl'>
             { profile!.firstName } { profile!.lastName }
        </h1>
    </div>
}