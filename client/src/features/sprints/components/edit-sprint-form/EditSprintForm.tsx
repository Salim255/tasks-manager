import "./_edit-sprint-form.scss";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { type ChangeEvent } from "react";
import { updateSprintHttp, type UpdateSprintPayload } from "../../../projects/http/sprint.http";
import { useSprintSelector } from "../../states/sprintSelectors";
import { closeEditSprint } from "../../../projects/states/sprintSlice";
import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import { useSprintForm } from "../../form-builder/sprintFormBuilder";

export const EditSprintForm = () => {
   const { sprint } = useSprintSelector();
   const { state, setField, reset } = useSprintForm(sprint);
   const dispatch = useDispatch<AppDispatch>();
 
    console.log("Hello from edit sprint")
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

        if (!sprint) return;
        
        const payload: UpdateSprintPayload = {
            ...( (state.name !== undefined && state.name !== sprint.name) && { name: state.name } ),
            ...( (state.status !== undefined  &&  state.status !== sprint.status) && { status: state.status } ),
            ...( (state.startDate !== undefined  && state.startDate !== sprint.startDate) && { startDate: state.startDate } ),
            ...( (state.endDate  !== undefined  &&  state.endDate !== sprint.endDate) && { endDate: state.endDate } ),
            ...((state.completeDate !== undefined  && state.completeDate !== sprint.completeDate) && { completeDate: state.completeDate }),
        }

        console.log(payload);
        dispatch(updateSprintHttp({...payload, sprintId: sprint.id}))
        reset();
    }
    
    const closeModal = () => {
       dispatch(closeEditSprint());
    }

    return (
        <ModalOverlay onClose={closeModal}>
            <form
            data-modal-body
            className="edit-sprint-form"
            onSubmit={clickSubmit}
            >
            {/* Header */}
            <div className="edit-sprint-form__header">
                <div>
                <h2>Edit Sprint</h2>
                <p>Update sprint details and schedule.</p>
                </div>

                <button
                type="button"
                className="edit-sprint-form__close"
                onClick={closeModal}
                >
                <IoMdClose />
                </button>
            </div>

            {/* Content */}
            <div className="edit-sprint-form__body">

                {/* Sprint Name */}
                <div className="edit-sprint-form__field">
                <label htmlFor="name">Sprint Name</label>

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

                {/* Sprint Goal */}
                <div className="form__group">
                <label htmlFor="goal" className="form__label">Sprint Goal</label>

                <textarea
                    id="goal"
                    name="goal"
                    value={state.goal}
                    placeholder="Describe the primary objective of this sprint..."
                    onChange={handleChange}
                    className="form__textarea"
                />
                </div>

                {/* Dates */}
                <div className="form__group">

                <div className="form__group">
                    <label htmlFor="startDate" className="form__label">Start Date</label>

                    <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={state.startDate}
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
                    value={state.endDate}
                    onChange={handleChange}
                    className="form__input"
                    />
                </div>

                </div>

            </div>

            {/* Footer */}
            <div className="edit-sprint-form__footer">
                <button
                type="button"
                className="edit-sprint-form__cancel"
                onClick={closeModal}
                >
                Cancel
                </button>

                <button
                type="submit"
                className="btn btn-hero edit-sprint-form__submit"
                >
                Save Changes
                </button>
            </div>
            </form>
        </ModalOverlay>
    );
}