import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";

export const SprintHeader = () => {
    return(
        <div className='sprint__header'>
            <div className='sprint-title'>
                Scrum {sprint.name} 
                <EditSprintDate {...sprint}/>
                <span> ({sprint.tasks.length} work items) </span>
            </div>
            <div className='sprint-actions'>
                <button disabled={sprint?.tasks?.length === 0}>start sprint</button>
            </div>
            <div 
                className='sprint-options'>
                <OptionsBtn 
                    sprint={sprint} 
                    isOptionsOpen={isOptionsOpen}
                    setOptionsOpen={setOptionsOpen}
                >
                    <ul>
                        <li>Edit Sprint</li>
                        <li>Delete Sprint</li>
                    </ul>
                </OptionsBtn>
            </div>
        </div>
    )
}