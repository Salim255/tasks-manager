import { Link, useNavigate } from "react-router-dom";
import "./_landing-page.scss";
import screen from "/assets/img/logos/screen.png";
import { demoLoginHttp } from "../auth/http/auth.http";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useIsAuthenticated } from "../auth/states/authSelectors";
import { useEffect } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated  = useIsAuthenticated();
  const dispatcher = useDispatch<AppDispatch>();


  const onDemo = () => {
    dispatcher(demoLoginHttp({ authType: "demo-login" }));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/create-project");
      return;
    }
  }, [isAuthenticated]);

  return (
    <section className="landing u-p-lg">

      <div className="landing__overlay" />

      <div className="landing__container">

        <div className="landing__hero">

          <span className="landing__eyebrow u-mb-3xl">
            Modern Project Management
          </span>

          <h1 className="landing__title heading-primary">
            FlowBoard
          </h1>

          <h2 className="landing__subtitle heading-secondary">
            Work flows when everything is clear.
          </h2>

          <p className="landing__description u-mt-2xl">
            A clean, fast and modern task manager designed for teams
            who value clarity, collaboration and execution.
          </p>

          <div className="landing__actions u-mt-4xl">

            <Link
              to="/auth"
              className="landing__button landing__button--primary">
              Login
            </Link>

            <button
              onClick={onDemo}
              className="landing__button landing__button--ghost">
              Try Demo
            </button>
          </div>

        </div>

        <div className="landing__visual">

          <img
            src={screen}
            alt="Flowboard Dashboard"
            className="landing__image"
          />

        </div>

      </div>

      <footer className="landing__footer u-p-2xl">
        © 2026 Flowboard — Built for clarity
      </footer>

    </section>
  );
};