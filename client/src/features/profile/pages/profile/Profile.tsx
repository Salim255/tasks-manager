import './_profile.scss';
import { useNavigate } from "react-router-dom";
import { useProfileSelector } from "../../states/profileSelectors";
import { ProfileForm } from "../../components/ProfileForm";
import { useEffect } from "react";
import { ProfileHero } from './components/hero/ProfileHero';

export const Profile = () => {
    const { isProfileLoading, profile } = useProfileSelector();
    const navigate = useNavigate();

    useEffect(() => {
    },[profile, isProfileLoading,navigate]);
    

    if (isProfileLoading) {
        return <h1>Loading...</h1>
    }
    

    if (!isProfileLoading && !profile) {
        return <ProfileForm />
    }
    
    
    return <section className="profile">
        <ProfileHero profile={profile!} />
        <div>
           <button >Manage Profile</button>
        </div>
    </section>
}