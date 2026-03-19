import './_dashboard.scss';
import { Navigate, Outlet } from "react-router-dom";
import { SmallSidebar } from './components/small-sidebar/SmallSidebar';
import { BigSidebar } from './components/big-sidebar/BigSidebar';
import { Navbar } from './components/navbar/Navbar';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../auth/states/authSelectors';
import { useProfileSelector } from '../profile/states/profileSelectors';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { fetchProjectsHttp } from '../projects/http/project.http';


export const Dashboard = () => {
    const { profile } = useProfileSelector();
    const isAuthenticated  = useIsAuthenticated();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (profile){
            dispatch(fetchProjectsHttp());
        }
    },[isAuthenticated, profile, dispatch])

    if (!isAuthenticated) return <Navigate to="/auth" replace />;

    if (!profile && isAuthenticated) return <Navigate to="/profile" replace />;
    
    return(
       <section className='shared-layout'>
            <main className='shared-layout__dashboard'>
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='shared-layout__dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
       </section>
    )
}