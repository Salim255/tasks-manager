import { FiCheck, FiX } from "react-icons/fi";
import { useTaskUpdating } from "../../states/taskSelectors";
import { EditableField } from "../editable-field/EditableField";
import "./_editable-title.scss";

export const EditableTitle = ({ title, handleSave }: { title: string; handleSave: () => void}) => {
    const isLoadingWithUpdate =  useTaskUpdating();
    return (
        <EditableField
           value={title}  
           onSave={handleSave}
            renderView={({ value, edit }) => (
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

             renderEdit={({ value, setValue, save, cancel }) => (
                <div className="editable-title editable-title--editing">

                    <input
                        className="editable-title__input"
                        value={value}
                        name="title"
                        autoFocus
                        disabled={isLoadingWithUpdate}
                        onChange={(e) =>
                            setValue(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                save();
                            }

                            if (e.key === "Escape") {
                                cancel();
                            }
                        }}
                    />

                    <div className="editable-title__actions">

                        <button
                            type="button"
                            className="editable-title__cancel"
                            disabled={isLoadingWithUpdate}
                            onClick={cancel}
                        >
                            <FiX />
                        </button>

                        <button
                            type="button"
                            className="editable-title__save"
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
}
