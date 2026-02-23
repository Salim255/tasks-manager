import "./_edit-sprint-date.scss";
import { useEffect, useState } from "react";
import { EditSprintForm } from "../forms/EditSprintForm";
import type { Sprint } from "../../model/sprint.model";
import { FaRegEdit } from "react-icons/fa";

export const EditSprintDate = (sprint: Sprint) => {
    const [isEditSprintOpen, setEditSprintOpen] = useState<boolean>(false);   
  
    const onEditSprintDate = (sprint: Sprint) => {
        setEditSprintOpen((prev) => !prev);
    }
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
                    ? ` (${new Date(sprint.startDate).toLocaleDateString()} - ${new Date(sprint.endDate).toLocaleDateString()})`
                    : 
                    <>
                        <button onClick={() => onEditSprintDate(sprint)}> 
                            <span><FaRegEdit/></span> 
                            add date
                        </button> 
                    </>
                    }
                </span> 
            </section>
            :
            <EditSprintForm sprint={sprint} setEditSprintOpen={setEditSprintOpen}/>
        }
       </>
    )
}