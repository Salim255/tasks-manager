import { ImProfile } from "react-icons/im";
import { FaWpforms } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { FiLayers } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";

export const links  = [
  {  id: 1, text: 'Projects', path: '/dashboard/projects', icon: <FiLayers />},
  {  id: 2, text: 'create project', path: '/dashboard/create-project', icon: <FiPlusSquare />},
]

export const tasksLinks = [
  {  id: 2, text: 'board', path: 'dashboard/tasks/board', icon:  <GrTasks /> },
  {  id: 4, text: 'backlog', path: '/dashboard/tasks/backlog', icon: <FaWpforms />},
  {  id: 5, text: 'all tasks', path: '/dashboard/tasks/all-tasks', icon: <ImProfile />}
]

export const projectLinks = [
  {
    id: 1,
    text: 'board',
    path: (projectId: string) => `/dashboard/projects/${projectId}/board`,
    icon: <GrTasks />
  },
  {
    id: 2,
    text: 'backlog',
    path: (projectId: string) => `/dashboard/projects/${projectId}/backlog`,
    icon: <FaWpforms />
  },
  {
    id: 3,
    text: 'tasks',
    path: (projectId: string) => `/dashboard/projects/${projectId}/tasks`,
    icon: <ImProfile />
  },
    {
    id: 4,
    text: 'Summary',
    path: (projectId: string) => `/dashboard/projects/${projectId}/statistics`,
    icon: <FiBarChart2 />
  }

];