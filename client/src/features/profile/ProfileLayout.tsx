import './_profile.scss';
import { Outlet } from 'react-router-dom';
import { BigSidebar } from '../dashboard/components/big-sidebar/BigSidebar';
import { NavLinks } from '../dashboard/components/nav-links/NavLinks';
import { DiScrum } from 'react-icons/di';
import { SmallSidebar } from '../dashboard/components/small-sidebar/SmallSidebar';
import { Navbar } from '../dashboard/components/navbar/Navbar';

export const ProfileLayout = () => {
   
    return <section className='shared-layout'>
        <div  className='shared-layout__dashboard'>
            <SmallSidebar />
            <BigSidebar>
                <header>
                    <DiScrum/>
                </header>
                <NavLinks/>
            </BigSidebar>

            <div>
                <Navbar />
                <div className='shared-layout__dashboard-page'>
                    <Outlet />
                </div>
            </div>
        </div>
    </section>
}