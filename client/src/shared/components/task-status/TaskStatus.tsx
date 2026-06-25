import type { TaskStatus } from "../../../features/tasks/models/task.model";
import "./_task-status.scss";

export const Status = ( { status }:{ status: TaskStatus}) => {
    const normalizeStatus = () => {
        switch(status){
            case "in_progress":
               return "in progress"
            case "done":
               return "done"
            default:
               return "to do"
        }
    }
 
   return (
    <span
        className={`task-status task-status--${status}`}
    >
        <span className="task-status__indicator" />
        <span className="task-status__label">
        {normalizeStatus()}
        </span>
    </span>
    );
}