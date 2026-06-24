import type { ReactNode } from "react";
import type { Task } from "../../../../models/task.model";

export const TasksColumn = ({
  title,
  tasks,
  renderCell,
}: {
  title: string;
  tasks: Task[];
  renderCell: (task: Task) => ReactNode;
}) => {
  return (
    <div className="tasks-column">
      <div className="tasks-column__header">
        {title}
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="tasks-column__cell"
        >
          {renderCell(task)}
        </div>
      ))}
    </div>
  );
};