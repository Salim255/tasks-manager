import { useMemo } from "react";
import type { Sprint } from "../../../models/sprint.model";
import type { Task, TaskStatus } from "../../../models/task.model";

export const useBoardData = (tasks: Task[], sprints: Sprint[]) => {
  return useMemo(() => {
    // Active sprint IDs
    const activeSprints = sprints.filter(s => s.status === "active").map(s => s.id);
    const activeSprintIds = new Set(activeSprints);

    // Initialize empty groups
    const tasksByStatus: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    // Loop tasks once
    for (const task of tasks) {
      if (!task.sprintId || !activeSprintIds.has(task.sprintId)) continue;
      tasksByStatus[task.status].push(task);
    }

    return {
        tasksByStatus,
        sprintSize: activeSprintIds.size
    };
  }, [tasks, sprints]);
};