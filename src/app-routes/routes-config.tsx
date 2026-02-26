import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";
import { AllTasks } from "../features/tasks/components/tasks-list/AllTasks";
import { CreateTask } from "../features/tasks/components/create-task/CreateTask";
import { TaskDetails } from "../features/tasks/components/task-details/TaskDetails";
import { Tasks } from "../features/tasks/Tasks";
import { Backlog } from "../features/tasks/components/backlog/Backlog";
import { Board } from "../features/tasks/components/board/Board";
import { CreateProject } from "../features/projects/pages/create-project/CreateProject";
import { ProjectsIndexRedirect } from "./currentProjectId";
import { Projects } from "../features/projects/Projects";
import { EmptyProjects } from "../features/projects/pages/empty-projects/EmptyProjects";



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
            {   
                path: 'tasks',
                Component: Tasks,
                children: [
                    { index: true, element: <Navigate to="all-tasks" replace /> },
                    {
                        path: 'all-tasks',
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