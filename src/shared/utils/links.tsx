import { ImProfile } from "react-icons/im";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
export const links  = [
      {  id: 2, text: 'profile', path: '/', icon:  <MdQueryStats /> },
      {  id: 4, text: 'add task', path: '/add-task', icon: <FaWpforms />},
      {  id: 5, text: 'all tasks', path: '/tasks', icon: <ImProfile />}
]

export const tasksLinks = [
      {  id: 2, text: 'board', path: '/tasks/board', icon:  <GrTasks /> },
      {  id: 4, text: 'backlog', path: '/tasks/backlog', icon: <FaWpforms />},
      {  id: 5, text: 'all tasks', path: '/tasks/all-tasks', icon: <ImProfile />}
]