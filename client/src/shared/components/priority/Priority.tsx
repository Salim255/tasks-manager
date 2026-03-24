import "./_priority.scss";
import type { TaskPriority } from "../../../features/projects/models/task.model";

export const Priority = ({ priority }:{priority: TaskPriority}) => {
    return <div>
        hello from priority {priority}
    </div>
}