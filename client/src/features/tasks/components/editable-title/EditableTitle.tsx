type EditableFieldProps<T> = {
    value: T;

    renderView: (value: T) => React.ReactNode;

    renderEdit: (
        value: T,
        onChange: (value: T) => void,
    ) => React.ReactNode;

    onSave: (value: T) => void | Promise<void>;

    onCancel?: () => void;
};

export const EditableTitle = () => {
    return   <div className='editable-title'>
            <span> {task.title} </span>
        </div>
}