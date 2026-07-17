export interface ProjectOverview {
  activeProjectsCount: number;
  tasks: {
    total: number;
    inProgress: number;
    done: number;
    todo: number;
  };
}

export interface AssignedToMeOverview {
  totalAssigned: number;
  dueThisWeek: number;
  needsAttention: {
    today: Task[];
    tomorrow: Task[];
    highPriority: Task[];
  };
}

export interface DashboardData {
  projectsOverview: ProjectOverview;
  assignedToMe: AssignedToMeOverview;
}

export interface ProjectCardData {
  id: string;
  name: string;
  key: string;
  progressPercentage: number;
  sprints: {
    active: {
      total: number;
    };
  };
}

export interface Task {
  id: string;
  title: string;
  issueKey: string;
}
