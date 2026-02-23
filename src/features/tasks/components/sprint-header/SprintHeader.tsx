import './_sprint-header.scss';
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { Sprint } from "../../model/sprint.model";
import { EditSprintDate } from "../edit-sprint-date/EditSprintDate";
import { useState } from 'react';

export const SprintHeader = ({
        sprint,
        isOptionsOpen,
        setOptionsOpen,
    }: { 
        sprint: Sprint,
        isOptionsOpen: string | null, 
        setOptionsOpen: (sprintId: string | null) => void ,
    }) => {
        const [isEditSprintOpen, setEditSprintOpen] = useState<boolean>(false); 
        
        const onStartSprint = () => {     
            
        }
        return(
            <div className='sprint-header'>
                <div className='sprint-header__title'>
                    Scrum {sprint.name} 
                    <EditSprintDate 
                        isEditSprintOpen={isEditSprintOpen} 
                        setEditSprintOpen={setEditSprintOpen}
                        sprint={sprint}/>
                    <span> ({sprint.tasks.length} work items) </span>
                </div>
                <div className='sprint-header__actions'>
                    <button disabled={sprint?.tasks?.length === 0} onClick={onStartSprint}>start sprint</button>
                </div>
                <div 
                    className='sprint-header__options'>
                    <OptionsBtn 
                        item={sprint} 
                        isOptionsOpen={isOptionsOpen}
                        setOptionsOpen={setOptionsOpen}
                    >
                        <ul className='options-list'>
                            <li className='options-list__item' onClick={() => setEditSprintOpen((prev) => !prev)}>
                                edit sprint
                            </li>
                    
                            <li className='options-list__item'>Delete Sprint</li>
                        </ul>
                    </OptionsBtn>
                </div>
            </div>
        )
}