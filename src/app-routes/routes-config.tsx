import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";
import { AllTasks } from "../features/tasks/AllTasks";
import { CreateTask } from "../features/tasks/CreateTask";
import { TaskDetails } from "../features/tasks/TaskDetails";

const routes: RouteObject[] = [
    {
        path: '/',
        Component:  Dashboard,
        children: [
            {   
              index: true,
              Component: Profile
            },
            {   
                path: 'all-tasks',
                Component: AllTasks,
                children: [
                    {
                        path: 'task-details',
                        Component: TaskDetails
                    }
                ]
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