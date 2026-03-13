import type { Task, TaskStatus } from "../../../../models/task.model";
import "./_tasks-in-percent.scss";

export const TasksInPercent = ({ tasksByStatus }: { tasksByStatus: Record<TaskStatus, Task[ ]>} ) => {
    return <div>
        { tasksByStatus.todo.length }
        { tasksByStatus.in_progress.length }
        { tasksByStatus.done.length }
    </div>
} 