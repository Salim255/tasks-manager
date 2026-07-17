export const HeroSection = ({ onCreateProject }) => (
  <section className="projects-home__hero">
    <div className="projects-home__hero-content">
      <span className="projects-home__eyebrow">Workspace overview</span>
      <h1 className="projects-home__title">Build with clarity.</h1>
      <p className="projects-home__subtitle">
        Keep projects, sprints, and tasks aligned in one focused workspace.
      </p>

      <div className="projects-home__hero-actions">
        <button onClick={onCreateProject} className="btn btn--primary">
          Create project
        </button>
      </div>
    </div>
  </section>
);
