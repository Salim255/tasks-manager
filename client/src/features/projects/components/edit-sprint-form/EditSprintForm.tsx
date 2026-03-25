import "./_edit-sprint-form.scss";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { useSprintForm } from "../../forms-builders/sprintFormBuilder";
import { type ChangeEvent } from "react";
import { updateSprintHttp, type UpdateSprintPayload } from "../../http/sprint.http";
import { useSprintSelector } from "../../states/sprintSelectors";
import { closeEditSprint } from "../../states/sprintSlice";
import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";

export const EditSprintForm = () => {
   const { sprint } = useSprintSelector();
   const { state, setField, reset } = useSprintForm(sprint);
   const dispatch = useDispatch<AppDispatch>();
 

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
    const clickSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
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
            <form  data-modal-body  className="form edit-sprint-form"  onSubmit={clickSubmit}>
                <div className="form-row edit-sprint-form__header">
                    <h1> Edit sprint: {state?.name}</h1>
                    <div>
                        <button onClick={closeModal}><IoMdClose /></button>
                    </div>
                </div>
                <div className="form-row edit-sprint-form__title">
                    <label htmlFor="name" className="form-label">Sprint name: </label>
                    <input
                        className="form-input"
                        id="name"
                        type="text"
                        name="name"
                        value={state.name}
                        placeholder="sprint name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row edit-sprint-form__start-date">
                    <label  className="form-label" htmlFor="startDate"> start date </label>
                    <input
                        className="form-input"
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={state.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row edit-sprint-form__end-date">
                   <label className="form-label" htmlFor="endDate"> end date </label>
                    <input
                        className="form-input"
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={state.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row edit-sprint-form__goal">
                    <label className="form-label" htmlFor="goal">Sprint goal </label>
                    <textarea
                        className="form-textarea"
                        id="goal"
                        name="goal"
                        value={state.goal}
                        placeholder="what is the goal of this sprint?"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row edit-sprint-form__actions">
                    <button onClick={closeModal}> cancel </button>
                    <button className="btn btn-hero edit-sprint-form__submit" type="submit"> update </button>
                </div>
            </form>
        </ModalOverlay>
    )
}