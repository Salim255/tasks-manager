import { ImProfile } from "react-icons/im";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { FiLayers } from "react-icons/fi";

export const links  = [
      {  id: 1, text: 'profile', path: '/', icon:  <MdQueryStats /> },
      {  id: 2, text: 'Projects', path: '/projects', icon: <FiLayers />},
      {  id: 3, text: 'add task', path: '/add-task', icon: <FaWpforms />},
      {  id: 4, text: 'all tasks', path: '/tasks', icon: <ImProfile />},
]

export const tasksLinks = [
      {  id: 2, text: 'board', path: '/tasks/board', icon:  <GrTasks /> },
      {  id: 4, text: 'backlog', path: '/tasks/backlog', icon: <FaWpforms />},
      {  id: 5, text: 'all tasks', path: '/tasks/all-tasks', icon: <ImProfile />}
]