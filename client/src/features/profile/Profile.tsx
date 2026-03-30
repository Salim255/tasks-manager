import { useEffect } from 'react';
import './_profile.scss';
import { ProfileForm } from './components/ProfileForm';
import { useProfileSelector } from './states/profileSelectors';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { isProfileLoading, profile } = useProfileSelector();
    const navigate = useNavigate();
    
    useEffect(() => {
    },[profile, isProfileLoading,navigate]);


    if(isProfileLoading) {
        return <h1>Loading...</h1>
    }

    if(!isProfileLoading && !profile){
        return <ProfileForm />
    }
    
    return (
        <section className="profile">
            <img 
                className='profile__hero'
                src='/assets/images/default-profile.jpg' alt='hero'/>
            <div>
                { profile!.firstName } { profile!.lastName }
            </div>
        </section>
    )
}