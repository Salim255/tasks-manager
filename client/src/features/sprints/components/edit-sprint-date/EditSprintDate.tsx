import "./_edit-sprint-date.scss";
import { useEffect } from "react";
import { EditSprintForm } from "../edit-sprint-form/EditSprintForm";
import type { Sprint } from "../../../projects/models/sprint.model";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../../../shared/utils/methods";
import { useSprintSelector } from "../../states/sprintSelectors";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";
import { openEditSprintModal } from "../../states/sprintSlice";

export const EditSprintDate = ({sprint}: { sprint: Sprint }) => {
        const dispatch = useDispatch<AppDispatch>();
        const { isOpenModal } = useSprintSelector();

        const onEditSprintDate = (sprint: Sprint) => {
            dispatch(openEditSprintModal({ sprintId: sprint.id}));
        }
        console.log("isOpenModal")
        useEffect(() => {
            
        }, [sprint]);
        
        return (
        <>
            {
                !isOpenModal  ?
                <section className="edit-sprint-header">
                    <span> 
                        {
                        sprint.startDate && sprint.endDate 
                        ?  `${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`
                        : 
                        <button
                            className="edit-btn"
                            onClick={() => onEditSprintDate(sprint)}> 
                            <span><FaRegEdit/></span> 
                            add date
                        </button> 
                        }
                    </span> 
                </section>
                :
                <EditSprintForm/>
            }
        </>
        )
}