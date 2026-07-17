export const ProjectsPanel = ({
  visibleProjects,
  hasMoreProjects,
  showAllProjects,
  setShowAllProjects,
  onNavigateProject,
}) => (
  <section className="projects-home__panel">

    <div className="projects-home__panel-header">
      <div>
        <h2 className="projects-home__panel-title">Recent projects</h2>
        <p className="projects-home__panel-subtitle">
          Pick up where your team left off.
        </p>
      </div>

      {hasMoreProjects && (
        <button
          onClick={() => setShowAllProjects((prev) => !prev)}
          className="projects-home__text-button"
        >
          {showAllProjects ? "Show less" : "View all"}
        </button>
      )}
    </div>

    <div className="projects-home__projects-list">
      {visibleProjects.map((p) => (
        <ProjectCard key={p.id} project={p} onClick={() => onNavigateProject(p)} />
      ))}
    </div>

  </section>
);
