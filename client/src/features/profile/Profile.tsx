import { useEffect } from 'react';
import './_profile.scss';
import { ProfileForm } from './components/ProfileForm';
import { useProfileSelector } from './states/profileSelectors';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';

export const Profile = () => {
    const { profile } = useProfileSelector();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
    
    },[profile, dispatch])

    if (profile) {
        return (
            <section className="profile">
                <img 
                    className='profile__hero'
                    src='/assets/images/default-profile.jpg' alt='hero'/>
                <div>
                    {profile.firstName} {profile.lastName}
                </div>
               {/*  <div> title</div> */}
            </section>
        )
    } 
  
    return (
        <ProfileForm />
    )
}