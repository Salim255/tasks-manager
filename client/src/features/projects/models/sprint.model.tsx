//import type { Task } from "./task.model";

import type { Task } from "./task.model";

export type SprintStatus = "active" | "completed" | "planned";

export interface Sprint {
  id: string;
  name: string;
  status: SprintStatus;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  goal?: string; 
  projectId: string;
  tasks: Task []; 
  createdAt: string;
  updatedAt: string;
};