import "./_landing-page.scss";
import screen from "/assets/img/logos/screen.png";

export const LandingPage = () => {
  return (
    <section className="landing">

      <div className="landing__overlay" />

      <div className="landing__container">

        <div className="landing__hero">

          <span className="landing__eyebrow">
            Modern Project Management
          </span>

          <h1 className="landing__title">
            Flowboard
          </h1>

          <h4 className="landing__subtitle">
            Work flows when everything is clear.
          </h4>

          <p className="landing__description">
            A clean, fast and modern task manager designed for teams
            who value clarity, collaboration and execution.
          </p>

          <div className="landing__actions">

            <button className="landing__button landing__button--primary">
              Login
            </button>

            <button className="landing__button landing__button--ghost">
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

      <footer className="landing__footer">
        © 2026 Flowboard — Built for clarity
      </footer>

    </section>
  );
};