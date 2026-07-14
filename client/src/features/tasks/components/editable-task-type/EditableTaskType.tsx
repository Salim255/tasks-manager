import { SelectDropdown, type SelectOption } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import type { TaskType } from "../../models/task.model";
import { TaskTypeBadge } from "../task-type-badge/TaskTypeBadge";

type EditableTypeProps = {
    taskType: TaskType;
    badgeType: 'icon' | 'badge';
    handleSave: (taskType: TaskType) => void;
};

const TASKTYPES:  SelectOption [] =
    [
        {
            value:"task",
            label: "task"
        },
        {
            value:"story",
            label: "story"
        },
        {
            label:"bug",
            value: "bug"
        }
    ];


export const EditableTaskType = ({ badgeType, taskType, handleSave}: EditableTypeProps) => {
    return (
        <SelectDropdown
            value={taskType}
            options={TASKTYPES}
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