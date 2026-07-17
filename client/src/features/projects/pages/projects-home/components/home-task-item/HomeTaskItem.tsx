import type { Task } from "../../interfaces/project-home.interface";

interface TaskItemProps {
  task: Task;
  type: "task" | "story" | "bug";
  meta: string;
}

export const HomeTaskItem = ({ task, type, meta }: TaskItemProps) => (
  <article className="projects-home__task-item">
    <div className={`projects-home__task-type projects-home__task-type--${type}`} />
    <div className="projects-home__task-content">
      <p className="projects-home__task-title">{task.title}</p>
      <span className="projects-home__task-meta">{task.issueKey} · {meta}</span>
    </div>
  </article>
);
