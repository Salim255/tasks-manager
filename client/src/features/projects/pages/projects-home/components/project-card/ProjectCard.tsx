import type { ProjectCardData } from "../../interfaces/project-home.interface";

interface ProjectCardProps {
  project: ProjectCardData;
  onClick: () => void;
}

export function stringToColor(value: string): string {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  const saturation = 55 + (Math.abs(hash >> 8) % 25); // 55-80%
  const lightness = 40 + (Math.abs(hash >> 16) % 20); // 40-60%

  return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.14)`;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
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
