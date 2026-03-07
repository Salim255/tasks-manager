import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";
import { TaskDetails } from "../features/tasks/components/tasks-details/TaskDetails";
import { Backlog } from "../features/projects/pages/backlog/Backlog";
import { Board } from "../features/projects/pages/board/Board";
import { CreateProject } from "../features/projects/pages/create-project/CreateProject";
import { ProjectsIndexRedirect } from "./currentProjectId";
import { Projects } from "../features/projects/Projects";
import { EmptyProjects } from "../features/projects/pages/empty-projects/EmptyProjects";
import { Auth } from "../features/auth/Auth";
import { ProtectedRoutes } from "../features/auth/guards/ProtectedRoutes";



const routes: RouteObject[] = [
    {
        path: '/',
        Component: ProtectedRoutes,
        children: [
                {
        path: '/',
        Component:  Dashboard,
        children: [
            {   
              index: true,
              Component: Profile
            },
             {
                path: 'create-project',
                Component: CreateProject
            },
            {
                path: 'projects/',
                Component: Projects,
                 children: [
                    { index: true, element:  <ProjectsIndexRedirect /> },
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
                        Component: TaskDetails
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
]

const AppRoutes  = createBrowserRouter(routes);

export default  AppRoutes;