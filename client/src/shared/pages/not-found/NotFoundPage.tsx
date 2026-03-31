import "./_notfound-page.scss";
import {NavLink } from "react-router-dom";

export const NotFoundPage = () => {
    return <div className="not-found-page">
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <NavLink to="/dashboard" className="btn">Go to Home</NavLink>
    </div>
}