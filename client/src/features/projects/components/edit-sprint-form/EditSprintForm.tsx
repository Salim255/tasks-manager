import "./_edit-sprint-form.scss";
import { IoMdClose } from "react-icons/io";
import type { Sprint } from "../../models/sprint.model";
import { useDispatch } from "react-redux";
import { onUpdateSprintStatus } from "../../states/sprintSlice";
import type { AppDispatch } from "../../../../redux/store";
import { useSprintForm } from "../../forms-builders/sprintFormBuilder";
import type { ChangeEvent } from "react";
import { updateSprintHttp, type UpdateSprintPayload } from "../../http/sprint.http";

export const EditSprintForm = ({ 
    sprint, 
    setEditSprintOpen,
 }: { 
    sprint: Sprint; 
    setEditSprintOpen: (open: boolean) => void,
 }) => {
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
        setEditSprintOpen(false);
    
        if (!sprint) return;

       /*  dispatch(updateSprintStatus({ 
            sprintId: sprint?.id, 
            status: sprint?.status === "upcoming" ? "planned" : sprint?.status,
        })) */
        /* dispatch(onUpdateSprintStatus({ 
            sprintId: sprint?.id, 
            status: sprint?.status === "upcoming" ? "planned" : sprint?.status,
        })); */
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
    
    return (
        <section className="edit-sprint">
            <form className="edit-sprint-form"  onSubmit={clickSubmit}>
                <div className="edit-sprint-form__header">
                    <h1> Edit sprint: {sprint?.name}</h1>
                    <div>
                        <button onClick={() => setEditSprintOpen(false)}><IoMdClose /></button>
                    </div>
                </div>
                <div className="edit-sprint-form__title">
                    <label htmlFor="name">Sprint name: </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={state.name}
                        placeholder="sprint name"
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-sprint-form__start-date">
                    <label htmlFor="startDate"> start date </label>
                    <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={state.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-sprint-form__end-date">
                   <label htmlFor="endDate"> end date </label>
                    <input
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={state.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-sprint-form__goal">
                    <label htmlFor="goal">Sprint goal </label>
                    <textarea
                        id="goal"
                        name="goal"
                        value={state.goal}
                        placeholder="what is the goal of this sprint?"
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-sprint-form__actions">
                    <button onClick={() => setEditSprintOpen(false)}> cancel </button>
                    <button className="edit-sprint-form__submit" type="submit"> update </button>
                </div>
            </form>
        </section>
    )
}