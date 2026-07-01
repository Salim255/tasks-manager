import "./_auth.scss";
import { AuthForm } from "./components/form/AuthFrom";
import { useIsAuthenticated } from "./states/authSelectors";
import { Navigate, useNavigate } from "react-router-dom";
import { useProfileSelector } from "../profile/states/profileSelectors";
import { HiArrowNarrowLeft } from "react-icons/hi";

export const Auth = () => {
    const navigate = useNavigate();
    const { profile, isProfileLoading } = useProfileSelector();
    const isAuthenticated  = useIsAuthenticated();
    // If authenticated and profile exists → go to dashboard
    if (isAuthenticated && !isProfileLoading && profile) {
        return <Navigate to="/dashboard/create-project" replace />;
    }

    // If authenticated but no profile → go to profile creation
    if (isAuthenticated && !isProfileLoading && !profile) {
        return <Navigate to="/profile" replace />;
    }

    return (
        <section className="app-auth">
            <div className="app-auth__back" onClick={() => navigate(-1)}>
                <HiArrowNarrowLeft />
            </div>
            <div className="app-auth__header">
                <h1 className="app-auth__logo">
                     FlowBoard
                </h1>
            </div>

            <AuthForm />
        </section>
    );
}