import type { Task } from "../../features/tasks/model/task.model";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design dashboard layout",
    description:
      "Create the main dashboard structure, responsive grid, spacing system, and visual hierarchy.",
    status: "todo",
    priority: "high",
    dueAt: "2026-02-25",
    createdAt: "2026-02-10T09:15:00.000Z",
    updatedAt: "2026-02-10T09:15:00.000Z",
  },
  {
    id: "2",
    title: "Implement sidebar navigation",
    description:
      "Develop BigSidebar and SmallSidebar components with active links and mobile overlay behavior.",
    status: "in_progress",
    priority: "medium",
    dueAt: "2026-02-22",
    createdAt: "2026-02-11T10:30:00.000Z",
    updatedAt: "2026-02-18T08:10:00.000Z",
  },
  {
    id: "3",
    title: "Create task model (TypeScript)",
    description:
      "Define a clean and scalable Task interface aligned with UI and backend requirements.",
    status: "done",
    priority: "high",
    createdAt: "2026-02-12T11:45:00.000Z",
    updatedAt: "2026-02-14T15:20:00.000Z",
  },
  {
    id: "4",
    title: "Build create-task form",
    description:
      "Implement controlled inputs with validation, proper typing, and form reset logic.",
    status: "todo",
    priority: "medium",
    dueAt: "2026-02-28",
    createdAt: "2026-02-13T14:10:00.000Z",
    updatedAt: "2026-02-13T14:10:00.000Z",
  },
  {
    id: "5",
    title: "Add task filtering feature",
    description:
      "Enable filtering by status and priority, ensuring correct state derivation.",
    status: "todo",
    priority: "low",
    createdAt: "2026-02-14T09:00:00.000Z",
    updatedAt: "2026-02-14T09:00:00.000Z",
  },
  {
    id: "6",
    title: "Implement drag & drop",
    description:
      "Allow tasks to be reordered and moved between columns while preserving state consistency.",
    status: "in_progress",
    priority: "high",
    dueAt: "2026-02-21",
    createdAt: "2026-02-15T16:40:00.000Z",
    updatedAt: "2026-02-18T09:30:00.000Z",
  },
  {
    id: "7",
    title: "Set up Redux state",
    description:
      "Create Redux Toolkit slice for tasks with reducers, actions, and selectors.",
    status: "todo",
    priority: "medium",
    createdAt: "2026-02-16T08:25:00.000Z",
    updatedAt: "2026-02-16T08:25:00.000Z",
  },
  {
    id: "8",
    title: "Integrate backend API",
    description:
      "Connect frontend to backend services with proper loading and error handling.",
    status: "todo",
    priority: "high",
    dueAt: "2026-03-05",
    createdAt: "2026-02-16T12:10:00.000Z",
    updatedAt: "2026-02-16T12:10:00.000Z",
  },
  {
    id: "9",
    title: "Add authentication flow",
    description:
      "Implement login, logout, protected routes, and session persistence.",
    status: "todo",
    priority: "high",
    createdAt: "2026-02-17T09:50:00.000Z",
    updatedAt: "2026-02-17T09:50:00.000Z",
  },
  {
    id: "10",
    title: "Write unit tests",
    description:
      "Add tests for reducers, services, and utility functions.",
    status: "todo",
    priority: "medium",
    createdAt: "2026-02-17T13:35:00.000Z",
    updatedAt: "2026-02-17T13:35:00.000Z",
  },
  {
    id: "11",
    title: "Configure CI/CD pipeline",
    description:
      "Set up automated linting, testing, and build validation workflows.",
    status: "todo",
    priority: "low",
    createdAt: "2026-02-18T07:10:00.000Z",
    updatedAt: "2026-02-18T07:10:00.000Z",
  },
  {
    id: "12",
    title: "Optimize UI performance",
    description:
      "Improve rendering efficiency and minimize unnecessary component re-renders.",
    status: "todo",
    priority: "medium",
    dueAt: "2026-03-10",
    createdAt: "2026-02-18T08:45:00.000Z",
    updatedAt: "2026-02-18T08:45:00.000Z",
  },
];