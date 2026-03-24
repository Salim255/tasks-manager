import type { Profile } from "../../profile/model/profile.model";
import type { Sprint } from "./sprint.model";
import type { Task } from "./task.model";

type MemberRole = 'admin' | 'member';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  ownerId: string;
  sprints: Sprint[];
  members: Member []
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  id: string;  
  projectId: string;
  profile: Profile;
  role: MemberRole; // 'admin' | 'member'
  createdAt: Date;
}