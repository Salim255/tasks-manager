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
    
    
   return (
   <section className="profile">

  <div className="profile__container">

    {/* HERO */}
    <div className="profile__hero">
      <ProfileHero profile={profile!} />
    </div>

    {/* ACCOUNT OVERVIEW */}
    <div className="profile__section profile__overview">
      <h2 className="profile__section-title">Account Overview</h2>

      <div className="profile__grid">
        <div className="profile__item">
          <span className="profile__item-label">Full Name</span>
          <span className="profile__item-value">Salim Hassan</span>
        </div>

        <div className="profile__item">
          <span className="profile__item-label">Email</span>
          <span className="profile__item-value">{profile!.email}</span>
        </div>

        <div className="profile__item">
          <span className="profile__item-label">Role</span>
          <span className="profile__item-value"> User </span>
        </div>

        <div className="profile__item">
          <span className="profile__item-label">Member Since</span>
          <span className="profile__item-value">{profile!.createdAt}</span>
        </div>
      </div>
    </div>

    <div className="profile__section profile__security">
      <h2 className="profile__section-title">Security</h2>

      <div className="profile__security-list">
        <div className="profile__security-item">
          <span>Password</span>
          <button className="profile__btn-link">Change</button>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}