import type { TaskStatus } from "../../../features/projects/models/task.model";
import "./_task-status.scss";

export const Status = ( { status }:{ status: TaskStatus}) => {
    const normalizeStatus = () => {
        switch(status){
            case "in_progress":
               return "in progress"
            default:
               return status
        }
    }
    return <div className="task-status">
        {normalizeStatus()}
    </div>
}