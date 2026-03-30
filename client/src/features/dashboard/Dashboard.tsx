import './_dashboard.scss';
import { Outlet } from "react-router-dom";
import { SmallSidebar } from './components/small-sidebar/SmallSidebar';
import { BigSidebar } from './components/big-sidebar/BigSidebar';
import { Navbar } from './components/navbar/Navbar';
import { useEffect } from 'react';
import { fetchProjectsHttp } from '../projects/http/project.http';
import { useProfileSelector } from '../profile/states/profileSelectors';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

export const Dashboard = () => { 
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useProfileSelector();
    useEffect(() => {
        if (profile) {
            dispatch(fetchProjectsHttp());
        }
    }, [profile, dispatch]);
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