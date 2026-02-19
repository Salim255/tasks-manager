import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";
import { AllTasks } from "../features/tasks/AllTasks";
import { CreateTask } from "../features/tasks/CreateTask";
import { TaskDetails } from "../features/tasks/TaskDetails";
import { Tasks } from "../features/tasks/Tasks";
import { Backlog } from "../features/tasks/components/Backlog";
import { Board } from "../features/tasks/components/Board";

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
                path: 'tasks',
                Component: Tasks,
                children: [
                    {
                        index: true,
                        Component: AllTasks
                    },
                    {
                        path: 'board',
                        Component: Board
                    },
                    {
                        path: 'backlog',
                        Component: Backlog
                    },
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