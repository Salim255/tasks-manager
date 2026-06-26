import { Assignee } from "../../../../../../shared/components/assignee/Assignee";
import { Priority } from "../../../../../../shared/components/priority/Priority";
import { Reporter } from "../../../../../../shared/components/reporter/Reporter";
import { TaskLabel } from "../../../../../../shared/components/task-label/TaskLabel";
import { Status } from "../../../../../../shared/components/task-status/TaskStatus";
import { formatDate } from "../../../../../../shared/utils/methods";
import type { Task } from "../../../../../tasks/models/task.model";
import "./_task-list-item.scss";
import { Group, Panel, Separator } from "react-resizable-panels";

export const TaskListItem = ({task}:{task: Task}) => {
    return <Group orientation="horizontal">
        <Separator />
        <Panel defaultSize={800}>
            <TaskLabel  name={task.title} />
        </Panel>
            <Separator />
        <Panel defaultSize={80}>  {task.description} </Panel>
            <Separator />
        <Panel defaultSize={80}>
            <Assignee assigneeId={task.assigneeId } pageName={"task-list-item"} /> 
        </Panel>
            <Separator />
        <Panel defaultSize={80}>
            <Reporter reporterId={task.ownerId!}/>
        </Panel>
            <Separator />
        <Panel defaultSize={80}>
            <Priority  priority={task.priority}/>
        </Panel>
            <Separator />
        <Panel defaultSize={80}>
           <Status status={task.status} />
        </Panel>
            <Separator />
        <Panel defaultSize={80}>
            {task.status=== "done" ? "done" : "unresolved"}
        </Panel>
           <Separator />
        <Panel defaultSize={80}>
            { formatDate(task.updatedAt) }
        </Panel>
           <Separator />
        <Panel defaultSize={80}>
            { task.dueAt && formatDate(task.dueAt) }
        </Panel>
            <Separator />
        <Panel defaultSize={80}>
            { formatDate(task.createdAt) }
        </Panel>
    </Group>
}