import type { Sprint } from "../../sprints/model/sprint.model";
import type { Task } from "../../tasks/models/task.model";
import type { Member } from "../../members/models/member.model";
import type { UserSummary } from "../../../shared/interfaces/shared.interfaces";

export type ProjectStatus = "active" | "archived";

export interface Project {
  id: string;
  name: string;
  demoClientId: string | null;
  description: string | null;
  key: string;

  status: ProjectStatus;

  nextTaskNumber: number;
  nextSprintNumber: number;

  ownerId: string;
  owner: UserSummary;

  tasks: Task[];
  sprints: Sprint[];
  members: Member[];

  createdAt: string;
  updatedAt: string;
}