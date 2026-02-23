import type { Task } from "./task.model";

export type SprintStatus = "active" | "completed" | "upcoming";

export interface Sprint {
  id: string;
  name: string;
  status: SprintStatus;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  tasks: Task[]; // ✅ embedded list
  createdAt: string;
  updatedAt: string;
};