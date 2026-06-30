import type { Member } from "./member.model";
import type { Sprint } from "./sprint.model";
import type { Task } from "../../tasks/models/task.model";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  reporterId: string;
  sprints: Sprint[];
  members: Member[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}