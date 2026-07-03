import { useMemo, Suspense } from "react";
import { createAppRouter } from "./router";
import { RouterProvider } from "react-router-dom";

function FullPageLoader() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }}>
      Loading...
    </div>
  );
}

export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);

    return <>
        <Suspense fallback={<FullPageLoader />}>
            <RouterProvider router={router} />
        </Suspense>
    </>
}