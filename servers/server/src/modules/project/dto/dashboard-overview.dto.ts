import { TaskDto } from "src/modules/task/dto/task.dto";

export interface DashboardOverviewDto {
  projectsOverview: ProjectsOverviewDto;
  tasksOverview: TasksOverviewDto;
  assignedToMe: AssignedToMeDto;
  recentProjects: RecentProjectDto[];
}

export interface TasksOverviewDto {
  totalTasks: number;

  todo: number;
  inProgress: number;
  done: number;

  assignedToMeCount: number;
}

export interface ProjectsOverviewDto {
  activeProjectsCount: number;

  lastUpdatedProjectsCount: number;

  tasks: ProjectTasksOverviewDto;

  sprints: ProjectSprintOverviewDto;
}

export interface ProjectTasksOverviewDto {
  total: number;

  todo: number;

  inProgress: number;

  done: number;
}

export interface ProjectSprintOverviewDto {
  total: number;

  active: number;

  planned: number;

  upcoming: number;

  completed: number;
}

export interface AssignedToMeDto {
  totalAssigned: number;

  dueThisWeek: number;

  needsAttention: NeedsAttentionDto;
}
export interface NeedsAttentionDto {
  today: TaskDto[];
  tomorrow: TaskDto[];
  highPriority: TaskDto[];
}

export interface RecentProjectDto {
  id: string;
  name: string;

  progressPercentage: number;

  sprints: {
    active: number;
    planned: number;
    nearRelease: number;
  };
}