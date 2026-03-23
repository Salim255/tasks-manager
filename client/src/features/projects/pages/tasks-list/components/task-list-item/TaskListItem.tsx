import type { Task } from "../../../../models/task.model";
import "./_task-list-item.scss";

export const TaskListItem = ({task}:{task: Task}) => {
    return <div className="task-list-item task-grid">
        <div className="task-list-item__name">{task.title}</div>
        <div className="task-list-item__name">{task.description}</div>
        <div className="task-list-item__name">{task.assigneeId}</div>
        <div className="task-list-item__name">{task.ownerId}</div>
        <div className="task-list-item__name">{task.priority}</div>
        <div className="task-list-item__name">{task.status}</div>
        <div className="task-list-item__name">{task.status=== "done" ? "done" : "unresolved"}</div>
        <div className="task-list-item__name">{task.updatedAt}</div>
        <div className="task-list-item__name">{task.dueAt}</div>
        <div className="task-list-item__name">{task.createdAt}</div>
    </div>
}