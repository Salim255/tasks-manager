import "./_edit-sprint-form.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { useRef, type ChangeEvent } from "react";
import { updateSprintHttp } from "../../http/sprint.http";
import { useSprintForm } from "../../form-builder/sprintFormBuilder";
import { closeEditSprint } from "../../states/sprintSlice";
import { useSelectedSprint } from "../../states/sprintSelectors";
import { removedUnchangedField } from "../../../../shared/utils/detect-field-change";
import type { UpdateSprintPayload } from "../../dto/sprint-dto";
import { EntityModal } from "../../../../shared/modals/entity-modal/EntityModal";

export const EditSprintForm = () => {
   const today = new Date().toISOString().split("T")[0];
   const formRef = useRef<HTMLFormElement | null>(null);
   const sprint  = useSelectedSprint();
   const { state, setField, reset } = useSprintForm(sprint);
   const dispatch = useDispatch<AppDispatch>();
    console.log(sprint, state)
   const handleChange = (
    event: ChangeEvent<
        HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
        >) => {
        setField(
            event.target.name as
            "name" | "goal" | "status" | "startDate" | "endDate" | "completeDate",
            event.target.value,
        );
   }
    const clickSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!sprint?.id) return;

        const original: UpdateSprintPayload = {
            name: sprint.name,
            status: sprint.status,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            completeDate: sprint.completeDate,
            goal: sprint.goal,
            };
        
       
       const payload: UpdateSprintPayload = removedUnchangedField(state, original);
    
       if (Object.keys(payload).length === 1) {
            return; // Nothing changed it has always error: {}
        }
       console.log(payload, "hello world");
        dispatch(updateSprintHttp({...payload, sprintId: sprint.id}))
        reset();
    }
    
    const closeModal = () => {
       dispatch(closeEditSprint());
    }

    const triggerSubmit = () => {
      formRef?.current?.requestSubmit();
    };

    return (
        <EntityModal
            title="Edit Sprint"
            description="Update sprint details and schedule."
            onClose={closeModal}
            actions={{
            cancel: { label: "Cancel", onClick: closeModal },
            submit: { 
                label: "update", 
                type: "submit", onClick: triggerSubmit, 
                loading: false 
            }
            }}
        >
            <form
             ref={formRef}
             data-modal-body
             className="form"
             onSubmit={clickSubmit}
            >
                <div className="form__group">
                    <label htmlFor="name" className="form__label">Sprint Name</label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={state.name}
                        placeholder="Sprint Alpha"
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>

                <div className="form__group">
                    <label htmlFor="goal" className="form__label">Sprint Goal</label>

                    <textarea
                        id="goal"
                        name="goal"
                        value={state.goal ?? ""}
                        placeholder="Describe the primary objective of this sprint..."
                        onChange={handleChange}
                        className="form__textarea"
                    />
                </div>

                <div className="form__group">
                    <label htmlFor="startDate" className="form__label">Start Date</label>

                    <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    min={today}
                    value={state.startDate ?? ""}
                    onChange={handleChange}
                    className="form__input"
                    />
                </div>

                <div className="form__group">
                    <label htmlFor="endDate" className="form__label">End Date</label>
                    <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    min={state.startDate || today}
                    value={state.endDate ?? ""}
                    onChange={handleChange}
                    className="form__input"
                    />
                </div>
            </form>
        </EntityModal>
    );
}