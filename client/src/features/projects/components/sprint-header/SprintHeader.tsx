import './_sprint-header.scss';
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { Sprint, SprintStatus } from "../../models/sprint.model";
import { EditSprintDate } from "../edit-sprint-date/EditSprintDate";
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../redux/store';
import { updateSprintHttp } from '../../http/sprint.http';

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
        const dispatch = useDispatch<AppDispatch>();

        const updateSprintStatus = () => { 
            if(!sprint?.id) return;
            
            const status: SprintStatus = sprint.status === 'planned' ? 'active': 'completed';
    
            const payload = {
                status,
                sprintId: sprint.id,
                ...(status === 'completed' && { completeDate: new Date().toISOString()})
            };
            dispatch(updateSprintHttp(payload));
        }


        const getActionText = ( status: SprintStatus ) => {
            switch (status) {
                case "planned": return "Start sprint";
                case "active": return "Complete sprint";
                case "completed": return "Sprint completed";
                default: return null;
            }
        }
        const countWorkItem = () => {
            return tasks.filter((task) => task.sprintId === sprint.id).length;
        }
        
        

        return (
            <div className='sprint-header'>
                <div className='sprint-header__title'>
                    Scrum {sprint.name} 
                    <EditSprintDate
                        sprint={sprint}/>
                    <span> { countWorkItem() } work items </span>
                </div>
                <div className='sprint-header__actions'>
                    {
                        getActionText(sprint.status) && 
                        <button 
                            disabled={!(sprint.startDate && sprint.endDate) || (sprint.status === 'completed')} 
                            onClick={() => updateSprintStatus()}>
                                {
                                    getActionText(sprint.status)
                                }
                        </button>
                    }
                   
                </div>
                <div 
                    className='sprint-header__options'>
                    <OptionsBtn 
                        item={sprint} 
                        isOptionsOpen={isOptionsOpen}
                        setOptionsOpen={setOptionsOpen}
                    >
                        <ul className='options-list'>
                            <li 
                                data-action="edit-sprint"
                                data-id={sprint.id}
                                className='options-list__item' 
                                >
                                edit sprint
                            </li>
                            <li 
                                data-id={sprint.id}
                                data-action="delete-sprint"
                                className='options-list__item'>
                                Delete Sprint
                            </li>
                        </ul>
                    </OptionsBtn>
                </div>
            </div>
        )
}