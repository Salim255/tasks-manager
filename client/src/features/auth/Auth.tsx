import "./_auth.scss";
import { useEffect } from "react";
import { AuthForm } from "./components/form/AuthFrom";
import { useIsAuthenticated } from "./states/authSelectors";
import { useNavigate } from "react-router-dom";
import { useProfileSelector } from "../profile/states/profileSelectors";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchProjectsHttp } from "../projects/http/project.http";

export const Auth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
      const { profile, isProfileLoading } = useProfileSelector();
    const isAuthenticated  = useIsAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) return;

        if (!isProfileLoading && profile) {
            dispatch(fetchProjectsHttp());
            navigate("/create-project", { replace: true });
        }

        if (!isProfileLoading && !profile) {
            navigate("/profile", { replace: true });
        }

    }, [isAuthenticated, profile, navigate, isProfileLoading, dispatch]);
    
    return <section className="app-auth">
        <div className="app-auth__header">
            <h1 className="title-underline"> FlowBoard </h1>
        </div>
        <AuthForm/>
    </section>
}