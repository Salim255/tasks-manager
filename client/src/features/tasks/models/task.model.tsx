type TaskStatus = "todo" | "in_progress" | "done";

type TaskPriority = "low" | "medium" | "high";
type TaskType = "task" | "bug" | "story";

interface UserProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
}

interface TaskUserProfileDto {
  id: string;
  profile: UserProfileDto | null;
}

export interface Task {
  id: string;

  title: string;
  description: string | null;

  taskType: TaskType;
  status: TaskStatus;
  priority: TaskPriority | null;

  reporterId: string;
  assigneeId: string | null;

  taskNumber: number;
  issueKey: string;

  sprintId: string | null;
  projectId: string;

  pointEstimate: number | null;
  dueAt: string | null;

  createdAt: string;
  updatedAt: string;

  reporter?: TaskUserProfileDto| null;

  assignee?:  TaskUserProfileDto | null;
}
