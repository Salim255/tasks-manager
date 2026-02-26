export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";
export type TaskType = "task" | "bug" | "story";

export interface Task {
  id: string;

  title: string;
  description?: string;

  taskType: TaskType;
  status: TaskStatus;
  priority: TaskPriority;

  ownerId?: string;    
  assigneeId?: string;

  sprintId?: string;

  dueAt?: string;        // ISO date (optional)

  createdAt: string;
  updatedAt: string;
}