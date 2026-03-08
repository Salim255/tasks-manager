import { RouterProvider } from "react-router-dom";
import AppRoutes from "./app-routes/routes-config";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "./redux/store";
import { useEffect } from "react";
import { refreshToken } from "./features/auth/http/auth.http";

function App(){
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //dispatch(refreshToken());
  }, [dispatch]);

  return <RouterProvider router={ AppRoutes }></RouterProvider>
}

export default App;