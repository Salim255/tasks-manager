import { useNavigate } from "react-router-dom";
import "./_error-boundary.scss";

export const ErrorBoundary = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    }
    
    return (
        <main className="error-boundary">
            <div className="error-boundary__card">
                <h1 className="error-boundary__title">
                    Something went wrong
                </h1>

                <p className="error-boundary__description">
                    An unexpected error occurred while loading this page.
                    Please refresh the page or try again later.
                </p>

                <button
                    className="error-boundary__button"
                    onClick={goHome}
                >
                 Go to Home
                </button>
            </div>
        </main>
    );
};