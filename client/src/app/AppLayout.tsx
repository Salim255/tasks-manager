import '../features/dashboard/_dashboard.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DiScrum } from 'react-icons/di';
import { motion } from "motion/react";
import type { AppDispatch, RootState } from '../redux/store';
import { fetchProjectsHttp } from '../features/projects/http/project.http';
import { SmallSidebar } from '../features/dashboard/components/small-sidebar/SmallSidebar';
import { Navbar } from '../features/dashboard/components/navbar/Navbar';
import { NavLinks } from '../features/dashboard/components/nav-links/NavLinks';
import { BigSidebar } from '../features/dashboard/components/big-sidebar/BigSidebar';

export const AppLayout = ({ children }:{children: React.ReactNode}) => { 
    const dispatch = useDispatch<AppDispatch>();
  
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
  
    useEffect(()  => {
        dispatch(fetchProjectsHttp());
    }, [dispatch]);
    

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