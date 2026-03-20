import "./_edit-sprint-date.scss";
import { useEffect } from "react";
import { EditSprintForm } from "../edit-sprint-form/EditSprintForm";
import type { Sprint } from "../../models/sprint.model";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../../../shared/utils/methods";

export const EditSprintDate = ({
        sprint, 
        isEditSprintOpen,
        setEditSprintOpen,
    }: { 
        sprint: Sprint, 
        isEditSprintOpen: boolean, 
        setEditSprintOpen: (open: boolean) => void,
    }) => {
        const onEditSprintDate = (sprint: Sprint) => {
            console.log(sprint, "hello from edit sprint date");
            setEditSprintOpen(!isEditSprintOpen);
        }
        
      /*   const handleDateFormat = () => {
            return `${new Date(sprint.startDate).toLocaleDateString()}`
        } */
        useEffect(() => {
            
        }, [sprint])
        return (
        <>
            {
                !isEditSprintOpen  ?
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
                <EditSprintForm sprint={sprint} setEditSprintOpen={setEditSprintOpen}/>
            }
        </>
        )
}