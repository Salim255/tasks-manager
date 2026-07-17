export const ProjectCard = ({ project, onClick }) => (
  <article className="projects-home__project-card" onClick={onClick}>

    <div className="projects-home__project-top">
      <div
        className="projects-home__project-badge"
        style={{ backgroundColor: stringToColor(project.key) }}
      >
        {project.key.slice(0, 2)}
      </div>

      <div>
        <h3 className="projects-home__project-title">{project.name}</h3>
        <p className="projects-home__project-key">{project.key}</p>
      </div>
    </div>

    <div className="projects-home__project-progress">
      <div className="projects-home__progress-row">
        <span>Progress</span>
        <span>{project.progressPercentage}%</span>
      </div>

      <div className="projects-home__progress-bar">
        <span style={{ width: `${project.progressPercentage}%` }} />
      </div>
    </div>

    <div className="projects-home__project-footer">
      <span className="projects-home__status projects-home__status--progress">
        Sprint active
      </span>
      <span className="projects-home__project-meta">
        {project.sprints.active.total} sprints
      </span>
    </div>

  </article>
);
