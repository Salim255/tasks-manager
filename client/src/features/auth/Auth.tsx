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
            <div className="app-auth__back" onClick={() => navigate("/landing")}>
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