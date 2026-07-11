import { Assignee } from "../../../../shared/components/assignee/Assignee";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import "./_editable-assignee.scss";


type EditableAssigneeProps = {
    TaskAssigneeId?: string;
    handleSave: (memberId: string) => void;
    taskMembers: {
        label: string; // user name
        value: string; // userId
    }[];
};


export const EditableAssignee = ({
    TaskAssigneeId,
    handleSave,
    taskMembers,
}: EditableAssigneeProps) => {


    return (
        <SelectDropdown
            value={TaskAssigneeId }
            options={taskMembers}

            onChange={(value) =>
                handleSave(value as  string)
            }
            placement={"right"}
            renderTrigger={(selected, open) => (
                <button
                    type="button"
                    className="editable-assignee__trigger"
                    onClick={(e) => {
                        e.stopPropagation();
                        open();
                    }}
                >
                   <Assignee
                        assigneeId={TaskAssigneeId ?? null}
                    /> 
                </button>
            )}
        />
    );
};