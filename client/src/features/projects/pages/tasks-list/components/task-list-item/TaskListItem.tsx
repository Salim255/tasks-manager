import { Assignee } from "../../../../../../shared/components/assignee/Assignee";
import { Priority } from "../../../../../../shared/components/priority/Priority";
import { Reporter } from "../../../../../../shared/components/reporter/Reporter";
import type { Task } from "../../../../models/task.model";
import "./_task-list-item.scss";

export const TaskListItem = ({task}:{task: Task}) => {
    return <div className="task-list-item task-grid">
        <div className="task-list-item__name">{task.title}</div>
        <div className="task-list-item__description">{task.description}</div>
        <div className="task-list-item__assignee">
            <Assignee assigneeId={task.assigneeId } />
        </div>
        <div className="task-list-item__reporter">
            <Reporter reporterId={task.ownerId!}/>
        </div>
        <div className="task-list-item__priority">
            <Priority  priority={task.priority}/>
        </div>
        <div className="task-list-item__status"> {task.status} </div>
        <div className="task-list-item__resolution"> {task.status=== "done" ? "done" : "unresolved"}</div>
        <div className="task-list-item__updated"> {task.updatedAt}</div>
        <div className="task-list-item__due-date"> {task.dueAt } </div>
        <div className="task-list-item__created-at">{task.createdAt}</div>
     
    </div>
}