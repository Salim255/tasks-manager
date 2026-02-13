import { Outlet } from "react-router-dom";
import { BigSidebar } from "./components/BigSidebar";
import { Navbar } from "./components/Navbar";
import { SmallSidebar } from "./components/SmallSidebar";


export const Dashboard = () => {
    return(
       <main>
            <BigSidebar></BigSidebar>
            <SmallSidebar></SmallSidebar>
            <div>
                <Navbar></Navbar>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
       </main>
    )
}