import "./_priority.scss";
import type { TaskPriority } from "../../../features/tasks/models/task.model";

interface PriorityProps {
  priority: TaskPriority;
}

const priorityLabel: Record<TaskPriority, string> = {
  low: "low",
  medium: "medium",
  high: "high",
};

export const Priority = ({ priority }: PriorityProps) => {
  const safePriority: TaskPriority = priority || "low";
  return (
    <span className={`priority priority--${safePriority}`}>
      {priorityLabel[safePriority]}
    </span>
  );
};