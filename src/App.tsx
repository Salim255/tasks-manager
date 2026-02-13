import { RouterProvider } from "react-router-dom";
import AppRoutes from "./app-routes/routes-config";


function App(){
  return <RouterProvider router={ AppRoutes }></RouterProvider>
}

export default App;