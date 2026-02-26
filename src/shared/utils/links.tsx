import { ImProfile } from "react-icons/im";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { FiLayers } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";

export const links  = [
      {  id: 1, text: 'profile', path: '/', icon:  <MdQueryStats /> },
      {  id: 2, text: 'Projects', path: '/projects', icon: <FiLayers />},
      {  id: 3, text: 'create project', path: '/create-project', icon: <FiPlusSquare />},
      {  id: 4, text: 'all tasks', path: '/tasks', icon: <ImProfile />},
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
    path: (projectId: string) => `/projects/${projectId}/board`,
    icon: <GrTasks />
  },
  {
    id: 2,
    text: 'backlog',
    path: (projectId: string) => `/projects/${projectId}/backlog`,
    icon: <FaWpforms />
  },
  {
    id: 3,
    text: 'tasks',
    path: (projectId: string) => `/projects/${projectId}/tasks`,
    icon: <ImProfile />
  }
];