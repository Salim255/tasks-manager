import { useEffect, useState } from "react";

type EditableFieldProps<T> = {
  value: T;

  renderView: (props: {
    value: T;
    edit: () => void;
  }) => React.ReactNode;

  renderEdit: (props: {
    value: T;
    setValue: (value: T) => void;
    save: () => void;
    cancel: () => void;
  }) => React.ReactNode;

  onSave: (value: T) => void | Promise<void>;
};

export const EditableField = <T,>({
        value,
        renderView,
        renderEdit,
        onSave,
        }: EditableFieldProps<T>) => {

        const [isEditing, setIsEditing] = useState(false);
        const [draft, setDraft] = useState(value);

    useEffect(() => {
        setDraft(value);
    }, [value]);

    const edit = () => {
        setDraft(value);
        setIsEditing(true);
    };

    const cancel = () => {
        setDraft(value);
        setIsEditing(false);
    };

    const save = async () => {
        await onSave(draft);
        setIsEditing(false);
    };

    if (isEditing) {
        return <>
            {
                renderEdit({
                    value: value,
                    setValue: setDraft,
                    save,
                    cancel
                })
            }
        </>
    } else {
      return <>
        {
            renderView({
                value: value,
                edit
            })
        }
      </>  
    }
    
}