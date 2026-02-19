import { Outlet } from "react-router-dom";
import { TasksNavbar } from "./components/TasksNavbar";

export const Tasks = () => {
    return (
        <>
            <TasksNavbar ></TasksNavbar>
            <Outlet></Outlet>
        </>
    )
}