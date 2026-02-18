import './_dashboard.scss';
import { Outlet } from "react-router-dom";
import { BigSidebar } from "./components/BigSidebar";
import { Navbar } from "./components/Navbar";
import { SmallSidebar } from "./components/SmallSidebar";
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';


export const Dashboard = () => {
    const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);
    return(
       <section>
            <main className='dashboard'>
                <div>
                    <BigSidebar />
                    <SmallSidebar />
                </div>
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
       </section>
    )
}