import "./_editSprint.scss";
import { IoMdClose } from "react-icons/io";
import type { Sprint } from "../../model/sprint.model";

export const EditSprintForm = ({ 
    sprint, 
    setEditSprintOpen,
 }: { 
    sprint: Sprint | undefined; 
    setEditSprintOpen: (open: boolean) => void,
 }) => {
   
    const clickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditSprintOpen(false)
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
                        placeholder="sprint name"
                    />
                </div>
                <div className="edit-sprint-form__start-date">
                    <label htmlFor="startDate"> start date </label>
                    <input
                       id="startDate"
                        type="date"
                        name="startDate"
                    />
                </div>
                <div className="edit-sprint-form__end-date">
                   <label htmlFor="endDate"> end date </label>
                    <input
                       id="endDate"
                        type="date"
                        name="endDate"
                    />
                </div>
                <div className="edit-sprint-form__goal">
                    <label htmlFor="goal">Sprint goal </label>
                    <textarea
                        id="goal"
                        name="goal"
                        placeholder="what is the goal of this sprint?"
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