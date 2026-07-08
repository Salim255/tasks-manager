import type { Task } from "../models/task.model";

export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";
export type TaskType = "task" | "bug" | "story";

export type UpdateTaskPayload = {
  title?: string | null;
  status?: TaskStatus | null;
  taskType?: TaskType | null;
  assigneeId?: string | null;
  dueAt?: string | null;
  priority?:  TaskPriority | null ;
  sprintId?: string  | null;
  description?: string | null;
}

export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    assigneeId?: string;
    taskType: TaskType;
    dueAt?: string;
    projectId: string;
    sprintId?: string;
}

export type UpdateTaskSprintPayload = {
    taskId: string;
    sprintId: string | null;
};

export type CreateTaskResponseDto = {
    status: string;
    data: {
        task: Task
    }
}

export type  UpdatedTaskResponseDto = CreateTaskResponseDto;

export type GetTasksResponseDto = {
    status: string;
    data: {
        tasks: Task []
    }
}