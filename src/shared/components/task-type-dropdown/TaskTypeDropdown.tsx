import { IoBookmarkOutline, IoBugOutline, IoCheckboxOutline } from "react-icons/io5";
import type { TaskType } from "../../../features/tasks/model/task.model";
import { useState } from "react";
const typeIcon = {
    task: <IoCheckboxOutline />,
    bug: <IoBugOutline />,
    story: <IoBookmarkOutline />
};

export const TaskTypeDropdown = () => {
  const [type, setType] = useState<TaskType>("task");
  const handleTaskTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as TaskType);
    };
  return (
         <div style={{ position: "relative", display: "inline-block", marginRight: 8 }}  >
            {/* Visible Icon */}
            <div style={{ fontSize: 22 }}>
                {typeIcon[type]}
            </div>

            {/* Hidden Select */}
            <select 
                name="type" 
                id="type"
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    cursor: "pointer"
                }}
                onChange={handleTaskTypeChange}
                    >
                <option value="task">Task</option>
                <option value="bug">Bug</option>
                <option value="story">Story</option>
            </select>
        </div>
  );
}