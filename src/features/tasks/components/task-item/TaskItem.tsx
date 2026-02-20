import './_task-item.scss';
import type { Task } from "../../model/task.model";

type TaskItemProps = { task: Task; } & React.HTMLAttributes<HTMLDivElement>; // <-- this is the magic

export const TaskItem =  ({ task, ...props }: TaskItemProps) => {
    return (
        <section className="task-item" {...props} >
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