import './_option-btn.scss';
import { SlOptions } from "react-icons/sl";
import type { Sprint } from "../../../features/tasks/model/sprint.model";
import type { Task } from '../../../features/tasks/model/task.model';

export const OptionsBtn = ({ 
        item, 
        isOptionsOpen, 
        setOptionsOpen,
        children
    }: { 
        item: Sprint | Task, 
        isOptionsOpen: string | null, 
        setOptionsOpen: (sprintId: string | null) => void,
        children: React.ReactNode
    }) => {
  
    const isOpen = isOptionsOpen === item.id;
    const onOptionsClick = () => {
        setOptionsOpen(isOpen  ?  null: item.id);
    };
   
    return (
        <div className="options-btn" onClick={onOptionsClick}>
            <SlOptions />
            <div className={ isOpen
                ? `options-btn__modal options-btn__modal--active` 
                : 'options-btn__modal'
                }>
                { children }
            </div>
        </div>
    )
}