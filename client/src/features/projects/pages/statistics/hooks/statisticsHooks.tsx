import { useMemo } from "react";
import type { Sprint } from "../../../models/sprint.model";
import type { Task, TaskStatus } from "../../../models/task.model";

export const useStatisticsData = (tasks: Task[], sprints: Sprint[]) => {
  return useMemo(() => {
    // Active sprint IDs
    const sprintsIds = new Set(sprints.map((spr) => spr.id));
    // Initialize empty groups
    const tasksByStatus: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    // Loop tasks once
    for (const task of tasks) {
      if (!task.sprintId || !sprintsIds.has(task.sprintId)) continue;
      tasksByStatus[task.status].push(task);
    }

    return {
        tasksByStatus,
    };
  }, [tasks, sprints]);
};