import type { TaskStatus } from "../../../features/projects/models/task.model";
import "./_task-status.scss";

export const Status = ( { status }:{ status: TaskStatus}) => {
    return <div className="task-status">
        {status}
    </div>
}