import type { Sprint, SprintStatus } from "../model/sprint.model";

export type UpdateSprintPayload = {
  name?: string | null;
  status?: SprintStatus | null;
  startDate?: string | null;
  endDate?: string | null;
  completeDate?: string | null;
  goal?: string | null;
}

export type FetchSprintsResponseDto = {
    status: string;
    data: {
        sprints: Sprint []
    }
}
export type CreateSprintPayload = {
    projectId: string
}

export type CreateSprintResponseDto = {
    status: string;
    data: {
        sprint: Sprint
    }
}

export type UpdateSprintResponseDto = CreateSprintResponseDto ;