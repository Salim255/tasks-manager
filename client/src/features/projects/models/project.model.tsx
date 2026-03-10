import type { Sprint } from "./sprint.model";
import type { Task } from "./task.model";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  ownerId: string;
  sprints: Sprint[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}