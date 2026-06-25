import "./_resolution.scss"
import type { TaskStatus } from "../../../features/tasks/models/task.model";

export const Resolution = ({status}: {status: TaskStatus}) => {
    return  <span
            className={`resolution ${
            status === "done"
                ? "resolution--resolved"
                : "resolution--unresolved"
            }`}
        >
    {status === "done" ? "Done" : "Unresolved"}
  </span>
}