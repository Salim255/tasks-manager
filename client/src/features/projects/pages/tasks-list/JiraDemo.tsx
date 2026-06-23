import { Group, Panel, Separator } from "react-resizable-panels";
import "./test.scss";

const rows = [
  {
    task: "Login page",
    description: "Create authentication screen",
    assignee: "Salim",
    reporter: "John",
    priority: "High",
    status: "Todo",
  },
  {
    task: "Register page",
    description: "Create signup flow",
    assignee: "Anna",
    reporter: "John",
    priority: "Medium",
    status: "In Progress",
  },
  {
    task: "Dashboard",
    description: "User overview page",
    assignee: "Mike",
    reporter: "Anna",
    priority: "High",
    status: "Done",
  },
  {
    task: "Settings",
    description: "Profile preferences",
    assignee: "Tom",
    reporter: "Mike",
    priority: "Low",
    status: "Todo",
  },
];

export default function JiraDemo() {
  return (
    <div
      style={{
        height: "500px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Group orientation="horizontal">
        {/* Task */}
        <Panel defaultSize="20%">
          <Column
            title="Task"
            values={rows.map((r) => r.task)}
          />
        </Panel>

        <Separator className="task-grid__separator" />

        {/* Description */}
        <Panel defaultSize="30%">
          <Column
            title="Description"
            values={rows.map((r) => r.description)}
          />
        </Panel>

        <Separator className="task-grid__separator" />

        {/* Assignee */}
        <Panel defaultSize="15%">
          <Column
            title="Assignee"
            values={rows.map((r) => r.assignee)}
          />
        </Panel>

        <Separator className="task-grid__separator" />

        {/* Reporter */}
        <Panel defaultSize="15%">
          <Column
            title="Reporter"
            values={rows.map((r) => r.reporter)}
          />
        </Panel>

        <Separator className="task-grid__separator" />

        {/* Priority */}
        <Panel defaultSize="10%">
          <Column
            title="Priority"
            values={rows.map((r) => r.priority)}
          />
        </Panel>

        <Separator className="task-grid__separator" />

        {/* Status */}
        <Panel defaultSize="10%">
          <Column
            title="Status"
            values={rows.map((r) => r.status)}
          />
        </Panel>
      </Group>
    </div>
  );
}
