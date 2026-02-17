import './_dashboard.scss';
import { Outlet } from "react-router-dom";
import { BigSidebar } from "./components/BigSidebar";
import { Navbar } from "./components/Navbar";
import { SmallSidebar } from "./components/SmallSidebar";


export const Dashboard = () => {
    return(
       <main className="dashboard">
            <div className='dashboard__sidebar'>
                <BigSidebar></BigSidebar>
                <SmallSidebar></SmallSidebar>
            </div>
            <div className='dashboard__navbar'>
               <div className='nav'>
                 <Navbar  ></Navbar>
               </div>
                <div className='dashboard__children'>
                    <Outlet></Outlet>
                </div>
            </div>
       </main>
    )
}