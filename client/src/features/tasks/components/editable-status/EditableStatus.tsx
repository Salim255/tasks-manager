import { Status } from "../../../../shared/components/task-status/TaskStatus";
import type { TaskStatus } from "../../dto/task-dto";
import { EditableField, } from "../editable-field/EditableField";

export const EditableStatus = ({
    taskStatus,
    handleSave
    }: {
        taskStatus: TaskStatus; 
        handleSave: () => void
    }) => {

        return <EditableField
            value={taskStatus}
            renderView={({}) => (
                <>
                    <Status status={taskStatus} />
                </>
            )}
            renderEdit={({}) => (
                <>
                    <div>Hello from update </div>
                </>
            )}
            onSave={handleSave}
        />
}