import "./_auth.scss";
import { useEffect } from "react";
import { AuthForm } from "./components/form/AuthFrom";
import { useIsAuthenticated } from "./states/authSelectors";
import { Navigate } from "react-router-dom";

export const Auth = () => {
    const isAuthenticated  = useIsAuthenticated();
   
    useEffect(() => {}, [isAuthenticated ]);
    
    if(isAuthenticated) return <Navigate  to={'/'} replace/>

    return <section className="app-auth">
        <div>
            <h1 className="title-underline"> FlowBoard </h1>
        </div>
        <AuthForm/>
    </section>
}