import type { ReactNode } from "react";
import type { Task } from "../../../../../tasks/models/task.model";
import "./_tasks-column.scss"
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../../../redux/store";
import { setTaskViewerTask } from "../../../../../tasks/states/taskSlice";

export const TasksColumn = ({
  title,
  tasks,
  renderCell,
}: {
  title: string;
  tasks: Task[];
  renderCell: (task: Task) => ReactNode;
}) => {

  const dispatch = useDispatch<AppDispatch>();

  const onViewTask = (taskId: string) => {
      dispatch(setTaskViewerTask({taskId}))
  }
  

  return (
    <div className="tasks-column">
      <div className="tasks-column__body">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="tasks-column__cell"
            onClick={() => onViewTask(task.id)}
          >
            { renderCell(task) }
          </div>
        ))}

      </div>
    </div>
  );
};