import type { Task } from "../../models/task.model";

export const EditableTitle = ({ task }: { task: Task}) => {
    return (
        <EditableField
            value={task.title}
            renderView={(value) => (
                <span>{value}</span>
            )}
            renderEdit={(value, onChange) => (
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            onSave={(value) => {
                // update title
            }}
        />
    );
}
}