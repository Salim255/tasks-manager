import './_dashboard.scss';
import { Outlet } from "react-router-dom";
import { SmallSidebar } from './components/small-sidebar/SmallSidebar';
import { BigSidebar } from './components/big-sidebar/BigSidebar';
import { Navbar } from './components/navbar/Navbar';


//import { useSelector } from 'react-redux';
//import type { RootState } from '../../redux/store';


export const Dashboard = () => {
    //const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
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