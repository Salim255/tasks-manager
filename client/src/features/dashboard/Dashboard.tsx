import './_dashboard.scss';
import { Navigate, Outlet } from "react-router-dom";
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

export    const pageTransition = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.995,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  exit: {
    opacity: 0,
    y: -8,
    scale: 0.995,
  },

  transition: {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1], // Premium ease-out curve
  },
};
export const Dashboard = () => { 
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useProfileSelector();
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
 
    useEffect(() => {
        if (profile) {
            dispatch(fetchProjectsHttp());
        }
    }, [profile, dispatch]);
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
                    <Outlet />
                </div>
            </div>
        </motion.main>
    )
}