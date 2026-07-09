import { useEffect } from "react";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { loadUserHttp } from "../features/auth/http/auth.http";
import { AppRouter } from "./AppRouter";
import { AppProvider } from "./AppProvider";


function App(){
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUserHttp());
  }, [dispatch]);

  return (
    <AppProvider>
      <AppRouter/>
    </AppProvider>
  )
  
}

export default App;