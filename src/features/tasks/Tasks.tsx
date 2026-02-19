import { Outlet } from "react-router-dom";
import { TasksNavbar } from "./components/task-navbar/TasksNavbar";

export const Tasks = () => {
    return (
        <>
          <TasksNavbar ></TasksNavbar>
          <Outlet></Outlet>
        </>
    )
}