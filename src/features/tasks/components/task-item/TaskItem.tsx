import './_task-item.scss';
import type { Task } from "../../model/task.model";

export const TaskItem =  ({ task }: {task: Task}) => {
    return (
        <section className="task-item" draggable >
            <div>
                {task.title}
            </div>
            <div>
                {task.status}
            </div>
            <div>
                {task.assigneeId}
            </div>
        </section>
    )
} 