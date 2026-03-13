import "./_task-type-dropdown.scss";
import { RiArrowDropDownLine } from "react-icons/ri";
import { type ChangeEvent, type FC } from "react";
import { typeIcon } from "../../utils/methods";


interface TaskTypeDropdownProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   name?: string; // optional name for forms
  children: React.ReactNode; // for options
}


export const TaskTypeDropdown: FC<TaskTypeDropdownProps> = ( { children, value, name, onChange }) => {
  return (
    <section 
        className="task-drop-down"  >
        <div className="task-drop-down__container" >
            <div className="task-drop-down__icon">
                { typeIcon(value) }
            </div>
            <select 
                className="task-drop-down__select"
                name={name}
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