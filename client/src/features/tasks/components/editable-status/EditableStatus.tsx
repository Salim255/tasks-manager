import { Status } from "../../../../shared/components/task-status/TaskStatus";
import type { TaskStatus } from "../../dto/task-dto";
import { useTaskUpdating } from "../../states/taskSelectors";
import { EditableField, } from "../editable-field/EditableField";

export const EditableStatus = ({
    taskStatus,
    handleSave
    }: {
        taskStatus: TaskStatus; 
        handleSave: () => void
    }) => {
        const isLoadingWithUpdate =  useTaskUpdating();

        return <EditableField
            value={taskStatus}
            renderView={({ value, edit }) => (
                <div onClick={edit}>
                    <Status status={value} />

                    <button disabled={isLoadingWithUpdate}>
                        edit small icon
                    </button>
                </div>
            )}
            renderEdit={({cancel, save}) => (
                <>
                    <button
                        disabled={isLoadingWithUpdate}
                        onClick={save}>save</button>
                    <button onClick={cancel}>cancel</button>
                </>
            )}
            onSave={handleSave}
        />
}