import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { AuthGuard } from "../features/auth/guard/AuthGuard";
import { ErrorBoundary as AppRootErrorBoundary} from "../shared/pages/error-boundary/ErrorBoundary";
import { ProfileGuard } from "../features/auth/guard/ProfileGuard";
import { ProfileLayout } from "../features/profile/ProfileLayout";
import { Dashboard } from "../features/dashboard/Dashboard";
import { AppLayout } from "./AppLayout";

const routes: RouteObject[] = [
    {
        path: "/auth",
        lazy: () => import("../features/auth/Auth").then((m) => ({
            Component: m.Auth,
        }))
    },
    {
        path: "/landing",
        lazy: () => import("../features/landing-page/LandingPage").then((m) => ({
            Component: m.LandingPage,
        }))
    },
    {
        // Public routes
        path: '/',
        element: (
            <AuthGuard>
                <AppLayout>
                   <Outlet/>
                </AppLayout>
            </AuthGuard>
        ),
        ErrorBoundary: AppRootErrorBoundary,
        
        children: [
            {
                index: true,
                element: <Navigate to="/create-project" replace />
            },
            {   
                path: 'profile',
                element: (
                    <ProfileLayout>
                        <Outlet/>
                    </ProfileLayout>
                ),
                children: [
                    {   
                        index: true,
                        lazy: () => import("../features/profile/pages/profile/Profile").then((m) => ({
                            Component: m.Profile
                        })),
                    },
                    {
                        path: "create-profile",
                        lazy: () => import("../features/profile/components/ProfileForm").then((m) => ({
                            Component: m.ProfileForm
                        }))
                    },
                ]
            },

            {  
                element: (
                    <ProfileGuard>
                        <Dashboard>
                            <Outlet/>
                        </Dashboard>
                    </ProfileGuard>
                ),
                children:[
                    {
                        path: 'create-project',
                        lazy: () => import("../features/projects/pages/create-project/CreateProject").then((m) => ({
                            Component: m.CreateProject
                        }))
                    },
                    {
                        path: 'projects',
                        lazy: () => import("../features/projects/Projects").then((m) => ({
                            Component: m.Projects,
                        })),
                        children: [
                                {
                                    path: 'empty',
                                    lazy: () => import("../features/projects/pages/empty-projects/EmptyProjects")
                                        .then((m) =>({
                                            Component: m.EmptyProjects
                                        }))
                                },
                                {
                                    path: ':projectId/board',
                                    lazy: () => import("../features/projects/pages/board/Board")
                                        .then((m) => ({
                                            Component: m.Board
                                        }))
                                },
                                {
                                    path: ':projectId/backlog',
                                    lazy: () => import("../features/projects/pages/backlog/Backlog")
                                        .then((m) => ({
                                                Component: m.Backlog
                                        }))
                                },
                                {
                                    path: ':projectId/tasks',
                                    lazy: () => import("../features/projects/pages/tasks-list/TasksList").then((m) => ({
                                        Component: m.TasksList
                                    }))
                                }
                                , 
                                {
                                    path: ':projectId/statistics',
                                    lazy: () => import("../features/projects/pages/statistics/Statistics").then((m) => ({
                                        Component: m.Statistics
                                    }))
                                },
                            ]
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        lazy: () => import("../shared/pages/not-found/NotFoundPage").then((m) => ({
            Component: m.NotFoundPage
        }))
    }
]


export const createAppRouter = () => createBrowserRouter(routes);