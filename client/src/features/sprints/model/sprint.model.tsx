//import type { Task } from "./task.model";
import type { UserSummary } from "../../../shared/interfaces/shared.interfaces";
import type { Task } from "../../tasks/models/task.model";

export type SprintStatus = "active" | "completed" | "planned";

export interface Sprint {
  id: string;
  name: string;
  status: SprintStatus;

  startDate: string | null;
  endDate: string | null;
  completeDate: string | null;

  goal: string | null;

  projectId: string;

  creatorId: string;
  creator: UserSummary;

  tasks: Task[] | null;

  createdAt: string;
  updatedAt: string;
}