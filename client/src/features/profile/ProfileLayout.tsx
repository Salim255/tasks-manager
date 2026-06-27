import './_profile.scss';
import { Outlet } from 'react-router-dom';
import { BigSidebar } from '../dashboard/components/big-sidebar/BigSidebar';
import { NavLinks } from '../dashboard/components/nav-links/NavLinks';
import { DiScrum } from 'react-icons/di';
import { SmallSidebar } from '../dashboard/components/small-sidebar/SmallSidebar';
import { Navbar } from '../dashboard/components/navbar/Navbar';
import { useProfileSelector } from "./states/profileSelectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


export const ProfileLayout = () => {
    const { isProfileLoading, profile } = useProfileSelector();
     const navigate = useNavigate();

    useEffect(() => {
        },[profile, isProfileLoading,navigate]);

    return <section className='profile-layout'>
        <div  className='profile-layout__dashboard'>
            <SmallSidebar />
            <BigSidebar>
                <header>
                    <DiScrum/>
                </header>
                { profile &&  <NavLinks/> }
            </BigSidebar>

            <div>
                <Navbar />
                <div className='profile-layout__dashboard-page'>
                    <Outlet />
                </div>
            </div>
        </div>
    </section>
}