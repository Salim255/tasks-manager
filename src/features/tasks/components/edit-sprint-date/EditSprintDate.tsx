import "./_edit-sprint-date.scss";
import { useEffect } from "react";
import type { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeEditSprint } from "../../states/editSprintSlice";
import { IoMdClose } from "react-icons/io";

export const EditSprintDate = () => {
    const dispatch = useDispatch();
    const { sprint } = useSelector((store: RootState) => store.editSprintReducer);
    const closeModal = () => {
        dispatch(closeEditSprint());
    }
    useEffect(() => {
        console.log(sprint, "hello rom sprint 🛑🛑");
    }, [sprint])
    return (
        <section className="edit-sprint" >
            <form className="edit-sprint-form" >
                <div className="edit-sprint-form__header">
                    <h1> Edit sprint: {sprint?.name}</h1>
                    <div>
                        <button onClick={closeModal}><IoMdClose /></button>
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
                <div>
                    <button onClick={closeModal}> cancel </button>
                    <button className="edit-sprint-form__submit">submit</button>
                </div>
              
            </form>
        </section>
    )
}