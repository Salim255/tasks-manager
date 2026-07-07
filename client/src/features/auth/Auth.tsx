import "./_auth.scss";
import { AuthForm } from "./components/form/AuthFrom";
import { useIsAuthenticated } from "./states/authSelectors";
import { Navigate, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

export const Auth = () => {
    const navigate = useNavigate();
    const isAuthenticated  = useIsAuthenticated();

    // If authenticated but no profile → go to profile creation
    if (isAuthenticated ) {
        return <Navigate to="/" replace />;
    }

    return (
         <section className="app-auth">
    <div className="app-auth__background" />

    <button 
        className="app-auth__back"
        onClick={() => navigate("/landing")}
    >
        <HiArrowNarrowLeft />
        <span>Back</span>
    </button>

    <div className="app-auth__content">
        <header className="app-auth__header">
            <h1 className="app-auth__logo">
                FlowBoard
            </h1>

            <p className="app-auth__subtitle">
                Manage projects, tasks, and teams with clarity.
            </p>
        </header>

        <AuthForm />
    </div>
</section>
    );
}