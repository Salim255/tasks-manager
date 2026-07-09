import "./_empty-projects.scss";

export const EmptyProjects = () => {
  return (
    <section className="empty-projects">

      <div className="empty-projects__card">

        <div className="empty-projects__icon">
          ✦
        </div>

        <div className="empty-projects__content">

          <h1 className="empty-projects__title">
            Create your first project
          </h1>

          <p className="empty-projects__description">
            Your workspace is ready. Create a project to start
            organizing tasks, managing sprints, and collaborating
            with your team.
          </p>

        </div>


        <button className="btn btn--primary">
          Create project
        </button>

      </div>

    </section>
  );
};