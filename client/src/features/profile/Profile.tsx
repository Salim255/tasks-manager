import { useEffect } from 'react';
import './_profile.scss';
import { ProfileForm } from './components/ProfileForm';
import { useProfileSelector } from './states/profileSelectors';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { fetchProjectsHttp } from '../projects/http/project.http';

export const Profile = () => {
    const { profile } = useProfileSelector();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (profile){
            dispatch(fetchProjectsHttp());
        }
    },[profile, dispatch])

    if (profile) return <Navigate to="/create-project" replace />;

    return (
        <section className="profile">
            <ProfileForm />
        </section>
    )
}