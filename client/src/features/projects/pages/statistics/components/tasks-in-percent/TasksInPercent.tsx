import type { Task, TaskStatus } from "../../../../models/task.model";
import { BarChart } from "../bar-chart/BarChart";
import "./_tasks-in-percent.scss";

export const TasksInPercent = ({ tasksByStatus }: { tasksByStatus: Record<TaskStatus, Task[ ]>} ) => {
    return <div className="tasks-in-percent">
        <h1>Types of work </h1>
        <BarChart tasksByStatus={tasksByStatus}/>
    </div>
} 