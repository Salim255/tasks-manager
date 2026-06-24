import "./_priority.scss";
import type { TaskPriority } from "../../../features/tasks/models/task.model";

export const Priority = ({ priority }:{priority: TaskPriority}) => {
    return <div>
        {priority}
    </div>
}