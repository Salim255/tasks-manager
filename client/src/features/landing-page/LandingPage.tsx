import { Link } from "react-router-dom";
import "./_landing-page.scss";
import screen from "/assets/img/logos/screen.png";
import { getDemoClientId } from "../../shared/utils/demo_client_id";

export const LandingPage = () => {

  const navigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btnName: string = event.currentTarget.textContent;

    if (btnName==="Login") {

    } else {
      
    }
    console.log(event.currentTarget.textContent);
  }

  const onDemo = () => {
    // Check if demo_client_id exists in local storage, if not create one and store it
      const clientId = getDemoClientId();
    // Login as demo user
    // 1 We send the demo client id to the server to get a demo user token
    // 2 The server will return workspace and user data for the demo user based on the demo client id

  }

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

            <Link
              to="/demo"
              onClick={onDemo}
              className="landing__button landing__button--ghost">
              Try Demo
            </Link>

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