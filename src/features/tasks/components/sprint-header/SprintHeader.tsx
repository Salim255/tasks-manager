import './_sprint-header.scss';
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { Sprint } from "../../model/sprint.model";
import { EditSprintDate } from "../edit-sprint-date/EditSprintDate";

export const SprintHeader = ({
    sprint,
    isOptionsOpen,
    setOptionsOpen,
}: { 
    sprint: Sprint,
    isOptionsOpen: string | null, 
    setOptionsOpen: (sprintId: string | null) => void ,
}) => {
    return(
        <div className='sprint-header'>
            <div className='sprint-header__title'>
                Scrum {sprint.name} 
                <EditSprintDate {...sprint}/>
                <span> ({sprint.tasks.length} work items) </span>
            </div>
            <div className='sprint-header__actions'>
                <button disabled={sprint?.tasks?.length === 0}>start sprint</button>
            </div>
            <div 
                className='sprint-header__options'>
                <OptionsBtn 
                    item={sprint} 
                    isOptionsOpen={isOptionsOpen}
                    setOptionsOpen={setOptionsOpen}
                >
                    <ul className='options-list'>
                        <li className='options-list__item'>Edit Sprint</li>
                        <li className='options-list__item'>Delete Sprint</li>
                    </ul>
                </OptionsBtn>
            </div>
        </div>
    )
}