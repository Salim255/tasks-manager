import type { Task } from "../models/task.model";

export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";
export type TaskType = "task" | "bug" | "story";

export type UpdateTaskPayload = {
  title?: string;
  status?: TaskStatus;
  taskType?: TaskType;
  assigneeId?: string;
  dueAt?: string;
  priority?:  TaskPriority ;
  sprintId?: string 
  description?: string;
}

export interface CreateTaskPayload  {
    title: string;
    status: TaskStatus;
    assigneeId?: string;
    taskType: TaskType;
    dueAt?: string;
    projectId: string;
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