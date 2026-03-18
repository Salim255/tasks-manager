import "./_circle-legend.scss";
import type { Task, TaskStatus } from "../../../../models/task.model";

export const CircleLegend = ({tasksByStatus}: { tasksByStatus: Record<TaskStatus, Task[ ]>}) => {
    return  (
    <div className="circle-legend">
        <div className="circle-legend__todo">
            <span></span>  To Do { tasksByStatus.todo.length }
        </div>
        <div className="circle-legend__progress">
            <span></span> In progress { tasksByStatus.in_progress.length }
        </div>
        <div className="circle-legend__done">
            <span></span> Done { tasksByStatus.done.length }
        </div>
    </div>
    )
}