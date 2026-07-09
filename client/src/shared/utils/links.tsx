import { ImProfile } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { FiLayers } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";

export const links  = [
  {  id: 1, text: 'workspaces', path: '/workspaces', icon: <FiLayers />},
  {  id: 2, text: 'create project', path: '/create-project', icon: <FiPlusSquare />},
  {  id: 3, text: 'dashboard', path: '/dashboard', icon: <FiPlusSquare />},
]

export const tasksLinks = [
  {  id: 2, text: 'board', path: '/tasks/board', icon:  <GrTasks /> },
  {  id: 4, text: 'backlog', path: '/tasks/backlog', icon: <FaWpforms />},
  {  id: 5, text: 'all tasks', path: '/tasks/all-tasks', icon: <ImProfile />}
]

export const projectLinks = [
  {
    id: 1,
    text: 'board',
    path: (projectId: string) => `/workspaces/${projectId}/board`,
    icon: <GrTasks />
  },
  {
    id: 2,
    text: 'backlog',
    path: (projectId: string) => `/workspaces/${projectId}/backlog`,
    icon: <FaWpforms />
  },
  {
    id: 3,
    text: 'tasks',
    path: (projectId: string) => `/workspaces/${projectId}/tasks`,
    icon: <ImProfile />
  },
    {
    id: 4,
    text: 'summary',
    path: (projectId: string) => `/workspaces/${projectId}/statistics`,
    icon: <FiBarChart2 />
  }

];