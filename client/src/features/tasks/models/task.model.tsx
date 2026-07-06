import type { UserSummary } from "../../../shared/interfaces/shared.interfaces";

export type TaskStatus = "todo" | "in_progress" | "done";

type TaskPriority = "low" | "medium" | "high";
export type TaskType = "task" | "bug" | "story";



export interface Task {
  id: string;

  title: string;
  description: string | null;

  taskType: TaskType;
  status: TaskStatus;
  priority: TaskPriority | null;

  reporterId: string;
  assigneeId: string | null;

  taskNumber: number;
  issueKey: string;

  sprintId: string | null;
  projectId: string;

  pointEstimate: number | null;
  dueAt: string | null;

  createdAt: string;
  updatedAt: string;

  reporter?: UserSummary| null;

  assignee?:  UserSummary | null;
}
