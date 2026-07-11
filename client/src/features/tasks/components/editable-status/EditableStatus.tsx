import { IoChevronDown } from "react-icons/io5";
import { Status } from "../../../../shared/components/task-status/TaskStatus";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import type { TaskStatus } from "../../dto/task-dto";

import "./_editable-status.scss";


type EditableStatusProps = {
    taskStatus: TaskStatus;
    handleSave: (status: TaskStatus) => void;
    taskStatuses: {
        label: string;
        value: string;
    }[];
};


export const EditableStatus = ({
    taskStatus,
    handleSave,
    taskStatuses,
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