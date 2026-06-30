import type { Sprint } from "./sprint.model";
import type { Task } from "../../tasks/models/task.model";
import type { Member } from "../../members/models/member.model";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  ownerId: string;
  sprints: Sprint[];
  members: Member[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}