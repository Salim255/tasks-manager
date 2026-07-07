import type { Task } from "../../tasks/models/task.model";

export interface DashboardViewDtoResponseDto {
    status: string;
    data: {
        dashboardData: DashboardOverviewDto
    }
}

export interface DashboardOverviewDto {
  projectsOverview: ProjectsOverviewDto;
  assignedToMe: AssignedToMeDto;
  recentProjects: RecentProjectDto[];
}

export interface TasksOverviewDto {
  total: number;

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

  assignedToMeCount: number;
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
  today: Task[];
  tomorrow: Task[];
  highPriority: Task[];
}

export interface RecentProjectDto {
  id: string;
  name: string;
  key: string;

  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;

  sprints: {
    active: {
       total: number;
       tasksNumber: number; 
    };
    planned: {
       total: number;
       tasksNumber: number; 
    };
    nearRelease: {
       total: number;
       tasksNumber: number; 
    };
  };
}