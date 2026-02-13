import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";

const routes: RouteObject[] = [
    {
        path: '/',
        Component:  Dashboard,
        children: [
            {   
              path: '/profile',
              Component: Profile
            },
        ]
    }
]

const AppRoutes  = createBrowserRouter(routes);

export default  AppRoutes;