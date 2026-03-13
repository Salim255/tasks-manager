import "./_task-type-dropdown.scss";
import { IoBookmarkOutline, IoBugOutline, IoCheckboxOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState, type ChangeEvent, type FC } from "react";
import type { TaskType } from "../../../features/projects/models/task.model";


interface TaskTypeDropdownProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode; // for options
}

const typeIcon = (value: string ) => {
    switch(value){
        case "story":
           return <IoBookmarkOutline />;
        case "bug":
            return <IoBugOutline />;
        default: 
        return <IoCheckboxOutline />;
    }
};

export const TaskTypeDropdown: FC<TaskTypeDropdownProps> = ( { children, value, onChange }) => {
  //const [type, setType] = useState<TaskType>("task");

  const handleTaskTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // setType(e.target.value as TaskType);
    };

  return (
    <section 
        className="task-drop-down"  >
        <div className="task-drop-down__container" >
            <div className="task-drop-down__icon">
                { typeIcon(value) }
            </div>
            <select 
                className="task-drop-down__select"
                value={value}
                onChange={(e) => onChange(e)}
                >
                {children}
            </select>
            <RiArrowDropDownLine className="task-drop-down__arrow" />
        </div>
    </section>
  );
}