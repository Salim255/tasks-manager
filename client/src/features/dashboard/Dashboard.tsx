import './_dashboard.scss';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SmallSidebar } from './components/small-sidebar/SmallSidebar';
import { BigSidebar } from './components/big-sidebar/BigSidebar';
import { Navbar } from './components/navbar/Navbar';
import { useEffect } from 'react';
import { fetchProjectsHttp } from '../projects/http/project.http';
import { useProfileSelector } from '../profile/states/profileSelectors';
import type { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { DiScrum } from 'react-icons/di';
import { NavLinks } from './components/nav-links/NavLinks';
import { motion } from "motion/react";
import { useIsAuthenticated } from '../auth/states/authSelectors';

export const Dashboard = ({ children }:{children: React.ReactNode}) => { 
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { profile } = useProfileSelector();
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
    const isAuthenticated  = useIsAuthenticated();
  
 
    useEffect(() => {
        if (profile) {
            dispatch(fetchProjectsHttp());
        }
        if (!isAuthenticated) {
            navigate("/");
        }
        console.log(isAuthenticated, "Is authed")
    }, [profile, isAuthenticated, dispatch]);
    
    if (!profile) {
        return <Navigate to="/profile" replace />; // Redirect to login if not authenticated
    }

    return(
        <motion.main
        className={`dashboard ${
            isSideBarIsOpen ? "dashboard--sidebar-open" : "dashboard--sidebar-closed"
        }`}>
            <div className="dashboard__aside">
                <div className='dashboard__sm-bar'>
                    <SmallSidebar />
                </div>
                <div className='dashboard__bg-bar'>
                    <BigSidebar>
                        <header>
                            <DiScrum/>
                        </header>
                        <NavLinks/>
                    </BigSidebar>
                </div>
            </div>

            <div className="dashboard__content">
                <Navbar />
                <div className='dashboard__outlet'>
                    { children }
                </div>
            </div>
        </motion.main>
    )
}