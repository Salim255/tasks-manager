import { useMemo } from "react";
import type { Sprint } from "../../../models/sprint.model";
import type { Task, TaskStatus } from "../../../models/task.model";

export const useBoardData = (tasks: Task[], sprints: Sprint[]): Record<TaskStatus, Task[]> => {
  return useMemo(() => {
    // Active sprint IDs
    const activeSprintIds = new Set(
      sprints.filter(s => s.status === "active").map(s => s.id)
    );

    // Initialize empty groups
    const board: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: []
    };

    // Loop tasks once
    for (const task of tasks) {
      if (!task.sprintId || !activeSprintIds.has(task.sprintId)) continue;
      board[task.status].push(task);
    }

    return board;
  }, [tasks, sprints]);
};