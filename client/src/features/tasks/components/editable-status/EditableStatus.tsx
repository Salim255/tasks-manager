import { IoChevronDown } from "react-icons/io5";
import { Status } from "../../../../shared/components/task-status/TaskStatus";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import type { TaskStatus } from "../../dto/task-dto";

import "./_editable-status.scss";


type EditableStatusProps = {
    taskStatus: TaskStatus;
    handleSave: (status: TaskStatus) => void
};


const taskStatuses = [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "done", label: "Done" },
    ];

export const EditableStatus = ({
    taskStatus,
    handleSave,
}: EditableStatusProps) => {


    return (
        <SelectDropdown
            value={taskStatus}
            options={taskStatuses}

            onChange={(value) =>
                handleSave(value as TaskStatus)
            }

            renderTrigger={(selected, open) => (
                <button
                    type="button"
                    className="editable-status__trigger"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("Hello world")
                        open()
                    }}
                >
                    <Status
                        status={
                            selected?.value as TaskStatus
                        }
                    />
                    <IoChevronDown className="editable-status__icon" />
                </button>
            )}
        />
    );
};