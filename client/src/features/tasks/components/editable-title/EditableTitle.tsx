import { useTaskUpdating } from "../../states/taskSelectors";
import { EditableField } from "../editable-field/EditableField";

export const EditableTitle = ({ title, handleSave }: { title: string; handleSave: () => void}) => {
    const isLoadingWithUpdate =  useTaskUpdating();
    return (
        <EditableField
           value={title}  
           onSave={handleSave}
           renderView={({value, edit}) => (
                <div className="editable-title">
                    <span className="editable-title__text">
                        {value}
                    </span>

                    <button
                        type="button"
                        className="editable-title__edit-btn"
                        onClick={edit}
                        aria-label="Edit title"
                    >
                        ✏️
                    </button>
                </div>
           )}       
           renderEdit={({value, setValue, save, cancel }) => (
            <>
                <input
                    value={value}
                    name="title"
                    disabled={isLoadingWithUpdate}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    disabled={isLoadingWithUpdate}
                    onClick={save}
                >
                    save
                </button>

                <button onClick={cancel}>
                    cancel
                </button>
            </>
           )}
        />
    );
}
