import { useTasks } from "../../../tasks/states/taskSelectors";
import "./_tasks-list.scss";
import { Group, Panel, Separator } from "react-resizable-panels";
import { TasksColumn } from "./components/tasks-column/TasksColumn";
import { TaskLabel } from "../../../../shared/components/task-label/TaskLabel";
import type { Task } from "../../../tasks/models/task.model";
import { Reporter } from "../../../../shared/components/reporter/Reporter";
import { Priority } from "../../../../shared/components/priority/Priority";
import { Status } from "../../../../shared/components/task-status/TaskStatus";
import { Assignee } from "../../../../shared/components/assignee/Assignee";
import { Fragment } from "react/jsx-runtime";
import { Resolution } from "../../../../shared/components/resolution/Resolution";
import { DateItem } from "../../../../shared/components/date-item/DateItem";
import { TaskDescription } from "../../../../shared/components/task-description/TasDescription";
import { PageMotion } from "../../../../shared/motion/PageMotion";
import { DataTable } from "./components/data-table/DataTable";
import { useTaskColumns } from "./hooks/useTaskColumns";

export const TasksList = () => {
    const tasks = useTasks();
/*     const columns = [
    {
        title: "Task",
        size: 12,
        render: (task: Task) => (
        <TaskLabel name={task.title} />
        ),
    },
    {
        title: "Description",
        size: 12,
        render: (task: Task) => (
          <TaskDescription description={task.description} />
        )
    },
    {
        title: "Assignee",
        size: 15,
        render: (task: Task) => (
        <Assignee
          assigneeId={task.assigneeId}
          pageName="task-list-item"
        />
        ),
    },
    {
        title: "Reporter",
        size: 15,
        render: (task: Task) => (
        <Reporter reporterId={task.reporterId!} />
        ),
    },
    {
        title: "Priority",
        size: 12,
        render: (task: Task) => (
        <Priority priority={task.priority} />
        ),
    },
    {
        title: "Status",
        size: 12,
        render: (task: Task) => (
        <Status status={task.status} />
        ),
    },
    {
        title: "Resolution",
        size: 14,
        render: (task: Task) =>
        <Resolution status={task.status}/>
    },
    {
        title: "Updated",
        size: 10,
        render: (task: Task) =>
        <DateItem date={task.updatedAt}/>
    },
    {
        title: "Due Date",
        size: 10,
        render: (task: Task) =>
        <DateItem date={task.dueAt}/>
    },
    {
        title: "Created At",
        size: 10,
        render: (task: Task) =>
        <DateItem date={task.createdAt}/>
    },
    ]; */
    
    const columns = useTaskColumns();
   return (
    <PageMotion>
        <div className="data-table-container">

            <div className="data-table-scroll">
                <DataTable  columns={columns} data={tasks}/>
            </div>

        </div>
        
    </PageMotion>
    );
}