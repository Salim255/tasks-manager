import { useMemo } from "react";
import type { Task, TaskStatus, TaskType } from "../../../models/task.model";

export const useStatisticsData = (tasks: Task[]) => {
  return useMemo(() => {
    // Active sprint IDs
    // const sprintsIds = new Set(sprints.map((spr) => spr.id));
    // Initialize empty groups
    const tasksByStatus: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };
    
    const barChartDataPercentage: Record<TaskType, {label: string; nb: number;  value: number}> =  {
      task:  { label: "task", nb: 0,  value: 0 },
      bug:  { label: "bug", nb: 0, value: 0 },
      story:  { label: "story", nb: 0, value: 0}
     }

  
     const circleChartDataPercentage:
      Record<TaskStatus, {label: TaskStatus; nb: number;  value: number}
      > = { 
        todo:  { label: "todo", nb: 0,  value: 0 },
        in_progress:  { label: "in_progress", nb: 0, value: 0 },
        done:  { label: "done", nb: 0, value: 0}
     }
    // Loop tasks once
    for (const task of tasks) {
      //if (!task.sprintId || !sprintsIds.has(task.sprintId)) continue;
      tasksByStatus[task.status].push(task);
      barChartDataPercentage[task.taskType].nb++; 
      circleChartDataPercentage[task.status].nb++;
    }


    // Cal calculate the percentage
    const somme =
      barChartDataPercentage.bug.nb
      + barChartDataPercentage.task.nb
      + barChartDataPercentage.story.nb;
    const circleSomme =
      circleChartDataPercentage.todo.nb
      + circleChartDataPercentage.in_progress.nb
      + circleChartDataPercentage.done.nb;
    
    if (circleSomme > 0) {
      circleChartDataPercentage.todo.value =
        Math.round(((circleChartDataPercentage.todo.nb / somme)  * 100) * 10) / 10;
      circleChartDataPercentage.in_progress.value =
        Math.round(((circleChartDataPercentage.in_progress.nb / somme) * 100) * 10) / 10 ;
      circleChartDataPercentage.done.value = 
        Math.round(( (circleChartDataPercentage.done.nb / somme) * 100) * 10) / 10;
    }
 
    if (somme > 0) {
      barChartDataPercentage.bug.value =
        Math.round(((barChartDataPercentage.bug.nb / somme)  * 100) * 10) / 10;
      barChartDataPercentage.task.value =
        Math.round(((barChartDataPercentage.task.nb / somme) * 100) * 10) / 10 ;
      barChartDataPercentage.story.value =
        Math.round(( (barChartDataPercentage.story.nb / somme) * 100) * 10) / 10;
    }

    return {
        tasksByStatus,
        circleChartDataPercentage,
        barChartDataPercentage
    };
  }, [tasks ]);
};