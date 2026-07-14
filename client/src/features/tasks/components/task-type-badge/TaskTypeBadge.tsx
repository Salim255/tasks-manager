import "./_task-type-badge.scss";
import { typeIcon } from "../../../../shared/utils/methods";
import type { TaskType } from "../../models/task.model";

interface TaskTypeBadgeProps {
  type: TaskType;
  variant?: "icon" | "badge";
}


export const TaskTypeBadge = ({
  type,
  variant = "badge",
}: TaskTypeBadgeProps) => {

  return (
    <div
      className={`
        task-type-badge
        task-type-badge--${type}
        task-type-badge--${variant}
      `}
    >

      <span className="task-type-badge__icon">
        {typeIcon(type)}
      </span>


      {
        variant === "badge" && (
          <span className="task-type-badge__label">
            {type}
          </span>
        )
      }

    </div>
  );
};