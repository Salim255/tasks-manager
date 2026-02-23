import './_option-btn.scss';
import { SlOptions } from "react-icons/sl";
import type { Sprint } from "../../../features/tasks/model/sprint.model";

export const OptionsBtn = ({ 
        sprint, 
        isOptionsOpen, 
        setOptionsOpen ,
        children
    }: { 
        sprint: Sprint, 
        isOptionsOpen: string | null, 
        setOptionsOpen: (sprintId: string | null) => void,
        children: React.ReactNode
    }) => {
  
    const isOpen = isOptionsOpen === sprint.id;
    const onOptionsClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setOptionsOpen(isOpen  ?  null: sprint.id);
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