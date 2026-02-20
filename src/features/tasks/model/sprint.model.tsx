import type { Task } from "./task.model";

export interface Sprint {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  tasks: Task[]; // ✅ embedded list
  createdAt: string;
  updatedAt: string;
};