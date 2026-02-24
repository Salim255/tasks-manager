import "./_task-type-dropdown.scss";
import { IoBookmarkOutline, IoBugOutline, IoCheckboxOutline } from "react-icons/io5";
import type { TaskType } from "../../../features/tasks/model/task.model";
import { RiArrowDropDownLine } from "react-icons/ri";

import { useState } from "react";
const typeIcon = {
    task: <IoCheckboxOutline />,
    bug: <IoBugOutline />,
    story: <IoBookmarkOutline />
};

export const TaskTypeDropdown = ( {children}: {children: React.ReactNode}) => {
  const [type, setType] = useState<TaskType>("task");
  const handleTaskTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as TaskType);
    };
  return (
    <section 
        className="task-drop-down"  >
        <div className="task-drop-down__container" >
            <div className="task-drop-down__icon">
                {typeIcon[type]}
            </div>
            <select 
                className="task-drop-down__select"
                onChange={handleTaskTypeChange}
                >
                {children}
            </select>
            <RiArrowDropDownLine className="task-drop-down__arrow" />
        </div>
    </section>
  );
}