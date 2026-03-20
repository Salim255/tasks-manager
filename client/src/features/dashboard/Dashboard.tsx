import './_dashboard.scss';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SmallSidebar } from './components/small-sidebar/SmallSidebar';
import { BigSidebar } from './components/big-sidebar/BigSidebar';
import { Navbar } from './components/navbar/Navbar';
import { useEffect } from 'react';
import { useIsAuthenticated } from '../auth/states/authSelectors';
import { useProfileSelector } from '../profile/states/profileSelectors';


export const Dashboard = () => {
    const { profile, isProfileLoading } = useProfileSelector();
    const navigate = useNavigate();
    const isAuthenticated  = useIsAuthenticated();
  
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth", { replace: true });
            return;
        }
    },[isAuthenticated, profile, navigate, isProfileLoading])

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