import './_sprint-header.scss';
import { OptionsBtn } from "../../../../shared/components/options-btn/OptionsBtn";
import type { Sprint, SprintStatus } from "../../models/sprint.model";
import { EditSprintDate } from "../edit-sprint-date/EditSprintDate";
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../../redux/store';
import { updateSprintHttp } from '../../http/sprint.http';
import { openEditSprint } from '../../states/sprintSlice';
import { useMemo } from 'react';

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
            
            if (sprint.status === "planned" && !(sprint.startDate && sprint.endDate)) {
                dispatch(openEditSprint({ sprintId: sprint.id}));
                return;
            }
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
        const countWorkItem = useMemo(()=> {
            return tasks.filter((task) => task.sprintId === sprint.id).length;
        }, [tasks, sprint]);
        
        return (
            <div className='sprint-header'>
                <div className='sprint-header__title'>
                    <div className='sprint-name'> Scrum {sprint.name} </div>
                    <EditSprintDate
                        sprint={sprint}/>
                    <div className='sprint-items'> { countWorkItem } work items </div>
                </div>
                <div 
                    className='sprint-header__actions'
                    style={
                        {
                        "--show-tooltip": countWorkItem === 0 ? "1" : "0"
                        } as React.CSSProperties
                    }>
                    {
                       
                        <button 
                            className='actions-btn'
                            disabled={countWorkItem===0}
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