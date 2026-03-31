import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { ProfileLayout } from "../features/profile/ProfileLayout";
import { Backlog } from "../features/projects/pages/backlog/Backlog";
import { Board } from "../features/projects/pages/board/Board";
import { CreateProject } from "../features/projects/pages/create-project/CreateProject";
import { Projects } from "../features/projects/Projects";
import { EmptyProjects } from "../features/projects/pages/empty-projects/EmptyProjects";
import { Auth } from "../features/auth/Auth";
import { TasksList } from "../features/projects/pages/tasks-list/TasksList";
import { Statistics } from "../features/projects/pages/statistics/Statistics";
import { ProtectedRoutes } from "../features/auth/guard/ProtectedRoutes ";
import { Profile } from "../features/profile/pages/profile/Profile";
import { NotFoundPage } from "../shared/pages/not-found/NotFoundPage";


const routes: RouteObject[] = [
    {
        path: '/',
        Component: ProtectedRoutes,
        children:
        [
            {   
                path: 'profile',
                Component: ProfileLayout,
                children: [
                    {
                        index: true,
                        element: <Profile />
                    }
                ]
            },
            {
                path: '/dashboard',
                Component:  Dashboard,
                children: [
                    {
                        path: 'create-project',
                        Component: CreateProject
                    },
                    {
                        path: 'projects/',
                        Component: Projects,
                        children: [
                            { index: true, element:  <CreateProject /> },
                            {
                                path: 'empty',
                                Component: EmptyProjects
                            },
                            {
                                path: ':projectId/board',
                                Component: Board
                            },
                            {
                                path: ':projectId/backlog',
                                Component: Backlog
                            },
                            {
                                path: ':projectId/tasks',
                                Component: TasksList
                            }
                            , 
                            {
                                path: ':projectId/statistics',
                                Component: Statistics
                            }
                        ]
                    },
                ],
                
            },
        ]
    },
    // Public routes
    {
        path: "/auth",
        Component: Auth,
    },
    {
        path: "*",
        Component: NotFoundPage
    }
]

const AppRoutes  = createBrowserRouter(routes);

export default  AppRoutes;