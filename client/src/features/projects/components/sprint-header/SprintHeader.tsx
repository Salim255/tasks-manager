import './_sprint-header.scss';
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { Sprint, SprintStatus } from "../../models/sprint.model";
import { EditSprintDate } from "../edit-sprint-date/EditSprintDate";
import { useState } from 'react';
import { onUpdateSprintStatus } from '../../states/sprintSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';

export const SprintHeader = ({
        sprint,
        isOptionsOpen,
        setOptionsOpen,
    }: { 
        sprint: Sprint,
        isOptionsOpen: string | null, 
        setOptionsOpen: (sprintId: string | null) => void ,
    }) => {
        const { tasks } = useSelector((store: RootState) => store.taskSlice);
        const [isEditSprintOpen, setEditSprintOpen] = useState<boolean>(false); 
        const dispatch = useDispatch();

        const updateSprintStatus = (status: SprintStatus) => { 
            if(!sprint?.id) return;

            dispatch(onUpdateSprintStatus({ 
                sprintId: sprint?.id, 
                status: status,
            }));
        }

        const getActionText = ( status: SprintStatus ) => {
            switch (status) {
                case "planned": return "Start sprint";
                case "active": return "Complete sprint";
                case "completed": return "Sprint completed";
                case "upcoming": return "Start sprint";
                default: return "";
            }
        }
         const countWorkItem = () => {
            return tasks.filter((task) => task.sprintId === sprint.id).length;
        }
        
        return(
            <div className='sprint-header'>
                <div className='sprint-header__title'>
                    Scrum {sprint.name} 
                    <EditSprintDate 
                        isEditSprintOpen={isEditSprintOpen} 
                        setEditSprintOpen={setEditSprintOpen}
                        sprint={sprint}/>
                    <span> { countWorkItem() } work items </span>
                </div>
                <div className='sprint-header__actions'>
                    <button 
                        disabled={sprint?.tasks?.length === 0 || sprint.status === "upcoming"} 
                        onClick={() => updateSprintStatus(sprint.status === "planned" ? "active" : "completed")}>
                            {
                                getActionText(sprint.status)
                            }
                    </button>
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