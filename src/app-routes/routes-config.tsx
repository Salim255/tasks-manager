import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";
import { AllTasks } from "../features/tasks/AllTasks";
import { CreateTask } from "../features/tasks/CreateTask";

const routes: RouteObject[] = [
    {
        path: '/',
        Component:  Dashboard,
        children: [
            {   
              path: 'profile',
              Component: Profile
            },
            {   
                index: true,
                Component: AllTasks
            },
            {
                path: 'add-task',
                Component: CreateTask
            }
        ]
    }
]

const AppRoutes  = createBrowserRouter(routes);

export default  AppRoutes;