import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import type { TaskType } from "../../models/task.model";

type EditableTypeProps = {
    taskType: TaskType;
    handleSave: (taskType: TaskType) => void;
    taskTypes: {
        label: TaskType;
        value: TaskType;
    }[];
};


export const EditableTaskType = ({taskType, handleSave, taskTypes}: EditableTypeProps) => {
    return (
        <SelectDropdown
            value={taskType}
            options={taskTypes}
            onChange={(v) =>handleSave(v as TaskType)}
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
                </button>
            )}
        />
    )
}