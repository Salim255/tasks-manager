import { DashboardOverviewDto } from "src/modules/project/dto/dashboard-overview.dto";

export const ALLOW_REFRESH = 'allowRefresh';
export const IS_PUBLIC_KEY = 'isPublic';
export const DATA_SOURCE = 'DATA_SOURCE';
export const DB_OPTIONS = 'DB_OPTIONS';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';
export const PROFILE_REPOSITORY = ' PROFILE_REPOSITORY';
export const SPRINT_REPOSITORY = 'SPRINT_REPOSITORY';
export const TASK_REPOSITORY = 'TASK_REPOSITORY';
export const MEMBER_REPOSITORY = 'MEMBER_REPOSITORY ';

export const EMPTY_DASHBOARD_OVERVIEW: DashboardOverviewDto = {
  projectsOverview: {
    activeProjectsCount: 0,
    lastUpdatedProjectsCount: 0,
    tasks: {
      total: 0,
      todo: 0,
      inProgress: 0,
      done: 0,
      assignedToMeCount: 0,
    },
    sprints: {
      total: 0,
      active: 0,
      planned: 0,
      upcoming: 0,
      completed: 0,
    },
  },

  assignedToMe: {
    totalAssigned: 0,
    dueThisWeek: 0,
    needsAttention: {
      today: [],
      tomorrow: [],
      highPriority: [],
    },
  },

  recentProjects: [],
};
