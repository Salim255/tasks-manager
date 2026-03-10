import './_dashboard.scss';
import { Navigate, Outlet } from "react-router-dom";
import { SmallSidebar } from './components/small-sidebar/SmallSidebar';
import { BigSidebar } from './components/big-sidebar/BigSidebar';
import { Navbar } from './components/navbar/Navbar';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../auth/states/authSelectors';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { fetchProjectsHttp } from '../projects/http/project.http';
import { getTasksHttp } from '../projects/http/task.http';


export const Dashboard = () => {
    const isAuthenticated  = useIsAuthenticated();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(fetchProjectsHttp());
        dispatch(getTasksHttp());
    },[dispatch, isAuthenticated ])

    if (!isAuthenticated) return <Navigate to="/auth" replace />;

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