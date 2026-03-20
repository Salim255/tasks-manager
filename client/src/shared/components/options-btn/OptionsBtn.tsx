import { useEffect, useRef } from 'react';
import type { Sprint } from '../../../features/projects/models/sprint.model';
import type { Task } from '../../../features/projects/models/task.model';
import './_option-btn.scss';
import { SlOptions } from "react-icons/sl";
import { useClickOutside } from '../../hooks/useClickOutside';

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
    
    const ref = useRef<HTMLDivElement>(null!);

    const { register, unregister } = useClickOutside();

    useEffect(() => {
        if (ref.current) {
            register(ref, () => setOptionsOpen(null));
        }
        return () => unregister(ref);
    }, [setOptionsOpen, register, unregister]);
    
    return (
        <div ref={ref} className="options-btn" onClick={onOptionsClick}>
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