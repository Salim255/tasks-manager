import type { Task, TaskStatus, TaskType } from "../models/task.model";

export type UpdateTaskPayload = {
  title?: string;
  status?: TaskStatus;
  taskType?: TaskType;
  assigneeId?: string;
  dueAt?: string;
  priority?: 'low' | 'medium' | 'high';
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