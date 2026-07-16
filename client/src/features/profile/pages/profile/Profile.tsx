import './_profile.scss';
import { useProfileSelector } from "../../states/profileSelectors";
import { ProfileHero } from './components/hero/ProfileHero';
import { useUserData } from '../../../auth/states/authSelectors';
import { formatDate } from '../../../../shared/utils/methods';
import { ProfileSkeleton } from './skeletons/ ProfileSkeletons';

export const Profile = () => {
    const {isProfileLoading,  profile } = useProfileSelector();
    const userData = useUserData();
    
    if (isProfileLoading) {
        return  <ProfileSkeleton/>
    } 
   return (
    <section className="profile u-p-2xl">
        <div className="profile__container">

            <div className="profile__hero">
                <ProfileHero profile={profile!} />
            </div>
            <div className="profile__section profile__overview u-mb-xl">
            <h2 className="profile__section-title">Account Overview</h2>

            <div className="profile__grid">
                <div className="profile__item">
                <span className="profile__item-label"> Full Name </span>
                <span className="profile__item-value"> { profile?.firstName } { profile?.lastName } </span>
                </div>

                <div className="profile__item">
                <span className="profile__item-label">Email</span>
                <span className="profile__item-value">{userData?.email}</span>
                </div>

                <div className="profile__item">
                <span className="profile__item-label">Role</span>
                <span className="profile__item-value"> member </span>
                </div>

                <div className="profile__item">
                <span className="profile__item-label">Member Since</span>
                <span className="profile__item-value">{ formatDate(userData!.createdAt) }</span>
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