//import type { Task } from "./task.model";

import type { Task } from "./task.model";

export type SprintStatus = "active" | "completed" | "planned" | "upcoming";

export interface Sprint {
  id: string;
  name: string;
  status: SprintStatus;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  projectId: string;
  tasks: Task []; 
  createdAt: string;
  updatedAt: string;
};