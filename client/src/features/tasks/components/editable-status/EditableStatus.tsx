import { FiCheck, FiX, FiEdit2 } from "react-icons/fi";

import { Status } from "../../../../shared/components/task-status/TaskStatus";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";

import type { TaskStatus } from "../../dto/task-dto";

import { useTaskUpdating } from "../../states/taskSelectors";
import { EditableField } from "../editable-field/EditableField";

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

    const isLoadingWithUpdate = useTaskUpdating();


    return (
        <EditableField
            value={taskStatus}
            onSave={handleSave}

            renderView={({ value, edit }) => (
                <div className="editable-status">

                    <Status status={value} />

                    <button
                        type="button"
                        className="editable-status__edit"
                        disabled={isLoadingWithUpdate}
                        onClick={edit}
                        aria-label="Edit status"
                    >
                        <FiEdit2 />
                    </button>

                </div>
            )}


            renderEdit={({ value, setValue, save, cancel }) => (
                <div className="editable-status editable-status--editing">

                    <SelectDropdown
                        value={value}
                        options={taskStatuses}
                        onChange={(val) =>
                            setValue(val as TaskStatus)
                        }
                    />


                    <div className="editable-status__actions">

                        <button
                            type="button"
                            className="editable-status__cancel"
                            disabled={isLoadingWithUpdate}
                            onClick={cancel}
                        >
                            <FiX />
                        </button>


                        <button
                            type="button"
                            className="editable-status__save"
                            disabled={isLoadingWithUpdate}
                            onClick={save}
                        >
                            <FiCheck />
                        </button>

                    </div>

                </div>
            )}
        />
    );
};