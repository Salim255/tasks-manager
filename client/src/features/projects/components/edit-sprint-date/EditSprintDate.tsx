import "./_edit-sprint-date.scss";
import { useEffect } from "react";
import { EditSprintForm } from "../edit-sprint-form/EditSprintForm";
import type { Sprint } from "../../models/sprint.model";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../../../shared/utils/methods";
import { useSprintSelector } from "../../states/sprintSelectors";
import { openEditSprint } from "../../states/sprintSlice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";

export const EditSprintDate = ({
        sprint,
    }: { 
        sprint: Sprint,
        setEditSprintOpen: (open: boolean) => void,
    }) => {
        const dispatch = useDispatch<AppDispatch>();
        const { isOpen } = useSprintSelector();

        const onEditSprintDate = (sprint: Sprint) => {
            dispatch(openEditSprint({ sprintId: sprint.id}));
        }
        

        useEffect(() => {
            
        }, [sprint]);
        
        return (
        <>
            {
                !isOpen  ?
                <section className="edit-sprint-header">
                    <span> 
                        {
                        sprint.startDate && sprint.endDate 
                        ?  `${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`
                        : 
                        <button onClick={() => onEditSprintDate(sprint)}> 
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