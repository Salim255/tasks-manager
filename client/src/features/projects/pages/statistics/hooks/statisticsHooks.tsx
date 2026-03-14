import { useMemo } from "react";
import type { Sprint } from "../../../models/sprint.model";
import type { Task, TaskStatus, TaskType } from "../../../models/task.model";

export const useStatisticsData = (tasks: Task[], sprints: Sprint[]) => {
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
      task:  { label: "Task", nb: 0,  value: 0 },
      bug:  { label: "Bug", nb: 0, value: 0 },
      story:  { label: "Story", nb: 0, value: 0}
     }

  
    // Loop tasks once
    for (const task of tasks) {
      //if (!task.sprintId || !sprintsIds.has(task.sprintId)) continue;
      tasksByStatus[task.status].push(task);
      barChartDataPercentage[task.taskType].nb++; 
      
    }


    // Cal calculate the percentage
    const somme =
      barChartDataPercentage.bug.nb +  barChartDataPercentage.task.nb + barChartDataPercentage.story.nb;
    
    if (somme > 0) {
      barChartDataPercentage.bug.value = Math.round(((barChartDataPercentage.bug.nb / somme)  * 100) * 10) / 10;
      barChartDataPercentage.task.value =   Math.round(((barChartDataPercentage.task.nb / somme) * 100) * 10) / 10 ;
      barChartDataPercentage.story.value =  Math.round(( (barChartDataPercentage.story.nb / somme) * 100) * 10) / 10;
    }
 

    return {
        tasksByStatus,
        barChartDataPercentage
    };
  }, [tasks]);
};