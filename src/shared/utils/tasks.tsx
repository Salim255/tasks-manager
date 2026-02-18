export const tasks = [
  {
    id: "1",
    title: "Design dashboard layout",
    description:
      "Create the main dashboard structure: header, sidebar area, content grid, spacing and responsive breakpoints.",
    status: "todo",
    priority: "high",
  },
  {
    id: "2",
    title: "Implement sidebar navigation",
    description:
      "Build BigSidebar/SmallSidebar components with active links, mobile overlay behavior, and accessibility basics.",
    status: "in_progress",
    priority: "medium",
  },
  {
    id: "3",
    title: "Create task model (TypeScript)",
    description:
      "Define the Task interface with status/priority unions, dates, and a clean shape that matches UI + backend.",
    status: "done",
    priority: "high",
  },
  {
    id: "4",
    title: "Build create-task form",
    description:
      "Create a form with validation for title, optional description, priority, status, and due date; reset on submit.",
    status: "todo",
    priority: "medium",
  },
  {
    id: "5",
    title: "Add task filtering feature",
    description:
      "Add filters by status and priority, plus a quick search by title; ensure filters work together.",
    status: "todo",
    priority: "low",
  },
  {
    id: "6",
    title: "Implement drag & drop",
    description:
      "Enable moving tasks between columns and reordering within a column; persist order in state.",
    status: "in_progress",
    priority: "high",
  },
  {
    id: "7",
    title: "Set up Redux state",
    description:
      "Create a Redux Toolkit slice for tasks: add/edit/delete, move task, set filters, and selectors.",
    status: "todo",
    priority: "medium",
  },
  {
    id: "8",
    title: "Integrate backend API",
    description:
      "Connect the UI to the backend with CRUD endpoints; handle loading, errors, and retries cleanly.",
    status: "todo",
    priority: "high",
  },
  {
    id: "9",
    title: "Add authentication flow",
    description:
      "Implement login/logout, token or cookie handling, protected routes, and basic session persistence.",
    status: "todo",
    priority: "high",
  },
  {
    id: "10",
    title: "Write unit tests",
    description:
      "Add unit tests for reducers/services and core utilities; ensure edge cases are covered.",
    status: "todo",
    priority: "medium",
  },
  {
    id: "11",
    title: "Configure CI/CD pipeline",
    description:
      "Add CI to run linting, tests, and build checks; optionally deploy preview builds on pull requests.",
    status: "todo",
    priority: "low",
  },
  {
    id: "12",
    title: "Optimize UI performance",
    description:
      "Reduce unnecessary re-renders, memoize heavy components, and improve list rendering for large datasets.",
    status: "todo",
    priority: "medium",
  },
];