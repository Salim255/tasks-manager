import { RouterProvider } from "react-router-dom";
import AppRoutes from "./app-routes/routes-config";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import type { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { loadUserHttp } from "./features/auth/http/auth.http";


function App(){
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserHttp());
  }, [dispatch]);
  
  return<>
    <RouterProvider router={ AppRoutes }></RouterProvider>
     <ToastContainer />
   </>
}

export default App;