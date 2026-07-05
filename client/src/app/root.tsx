import { Outlet } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";


export const AppRoot = () => {
    return <Dashboard>
        <Outlet/>
    </Dashboard>
}