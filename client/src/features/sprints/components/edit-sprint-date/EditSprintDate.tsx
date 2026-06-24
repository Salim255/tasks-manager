import "./_edit-sprint-date.scss";
import type { Sprint } from "../../../projects/models/sprint.model";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../../../shared/utils/methods";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";
import { openEditSprintModal } from "../../states/sprintSlice";

export const EditSprintDate = ({sprint}: { sprint: Sprint }) => {
        const dispatch = useDispatch<AppDispatch>();
        const onEditSprintDate = (sprint: Sprint) => {
            dispatch(openEditSprintModal({ sprintId: sprint.id}));
        }      

        return (
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
        )
}