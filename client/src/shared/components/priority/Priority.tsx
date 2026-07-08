import type { TaskPriority } from "../../../features/tasks/dto/task-dto";
import "./_priority.scss";


interface PriorityProps {
  priority: TaskPriority | null;
}

const priorityLabel: Record<TaskPriority, string> = {
  low: "low",
  medium: "medium",
  high: "high",
};

export const Priority = ({ priority }: PriorityProps ) => {
  const safePriority: TaskPriority = priority || "low";
  return (
    <span className={`priority priority--${safePriority}`}>
      {priorityLabel[safePriority]}
    </span>
  );
};