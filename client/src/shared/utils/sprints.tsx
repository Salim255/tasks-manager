import type { Sprint } from "../../features/projects/models/sprint.model";

export const sprintsList: Sprint[] = [
  {
    id: "1",
    name: "Sprint 1",
    status: 'planned',
    startDate: undefined,
    endDate: undefined,
    completeDate: undefined,

    tasks: [],
    projectId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sprint 2",
    status: "completed",
    startDate: undefined,
    endDate: undefined,
    completeDate: undefined,
    projectId: '2',
    tasks: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Sprint 3",
    status: "active",
    startDate: undefined,
    endDate: undefined,
    completeDate: undefined,
    projectId: '3',
    tasks: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Sprint 4",
    status: "active",
    startDate: undefined,
    endDate: undefined,
    completeDate: undefined,
    projectId: '4',
    tasks: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];