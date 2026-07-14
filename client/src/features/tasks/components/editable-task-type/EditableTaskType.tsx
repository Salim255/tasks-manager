import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import type { TaskType } from "../../models/task.model";
import { TaskTypeBadge } from "../task-type-badge/TaskTypeBadge";

type EditableTypeProps = {
    taskType: TaskType;
    badgeType: 'icon' | 'badge';
    handleSave: (taskType: TaskType) => void;
    taskTypes: {
        label: TaskType;
        value: TaskType;
    }[];
};


export const EditableTaskType = ({ badgeType, taskType, handleSave, taskTypes}: EditableTypeProps) => {
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
                    <TaskTypeBadge variant={badgeType} type={selected?.value as TaskType }/>
                </button>
            )}
        />
    )
}