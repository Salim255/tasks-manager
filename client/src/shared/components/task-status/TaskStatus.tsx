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
 
    return <div className={`task-status task-status--${status}`}>
        { normalizeStatus() }
    </div>
}