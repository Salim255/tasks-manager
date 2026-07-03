import { useMemo } from "react";
import { createAppRouter } from "./router";
import { RouterProvider } from "react-router-dom";

export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);

    return <RouterProvider router={router} />;
}