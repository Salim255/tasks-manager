import { FiCheck, FiEdit2, FiX } from "react-icons/fi";

import { useTaskUpdating } from "../../states/taskSelectors";
import { EditableField } from "../editable-field/EditableField";

import "./_editable-title.scss";
import { TaskLabel } from "../../../../shared/components/task-label/TaskLabel";


type EditableTitleProps = {
    title: string;
    handleSave: () => void;
};


export const EditableTitle = ({
    title,
    handleSave,
}: EditableTitleProps) => {

    const isLoadingWithUpdate = useTaskUpdating();


    return (
        <EditableField
            value={title}
            onSave={handleSave}


            renderView={({ value, edit }) => (

                <div
                    className="editable-title"
                >
   
                    <TaskLabel name={value}/>
                 
                    <button
                        type="button"
                        className="editable-title__edit-btn"
                        disabled={isLoadingWithUpdate}
                        onClick={handleSave}
                        aria-label="Edit title"
                    >
                        <FiEdit2 />
                    </button>

                </div>

            )}



            renderEdit={({ value, setValue, save, cancel }) => (

                <div
                    className="editable-title editable-title--editing"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="editable-title__field">

                        <input
                            className="editable-title__input"

                            value={value}

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

                </div>

            )}

        />
    );
};