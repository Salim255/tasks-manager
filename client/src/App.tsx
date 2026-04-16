import { RouterProvider } from "react-router-dom";
import AppRoutes from "./app-routes/routes-config";
import { ToastContainer } from "react-toastify";

// import { refreshToken } from "./features/auth/http/auth.http";

function App(){
  const dispatch = useAppDispatch();
  return<>
    <RouterProvider router={ AppRoutes }></RouterProvider>
     <ToastContainer />
   </>
}

export default App;