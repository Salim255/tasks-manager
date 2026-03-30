import { RouterProvider } from "react-router-dom";
import AppRoutes from "./app-routes/routes-config";
// import { refreshToken } from "./features/auth/http/auth.http";

function App(){
  return <RouterProvider router={ AppRoutes }></RouterProvider>
}

export default App;