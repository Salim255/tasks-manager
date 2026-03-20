import { useEffect } from 'react';
import './_profile.scss';
import { ProfileForm } from './components/ProfileForm';
import { useProfileSelector } from './states/profileSelectors';

export const Profile = () => {
    const { profile } = useProfileSelector();

    useEffect(() => {},[profile]);

    if(!profile) return <ProfileForm />

    return (
        <section className="profile">
            <img 
                className='profile__hero'
                src='/assets/images/default-profile.jpg' alt='hero'/>
            <div>
                {profile.firstName} {profile.lastName}
            </div>
        </section>
    )
}