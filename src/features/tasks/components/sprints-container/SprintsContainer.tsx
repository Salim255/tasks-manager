import type { Sprint } from "../../model/sprint.model";
import { SprintItem } from "../sprint-item/SprintItem";

type SprintsContainerProps = {
  sprints: Sprint[];
  onDrop: (e: React.DragEvent<HTMLDivElement>, sprintId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
};


export const SprintsContainer = ({sprints, onDragOver, onDrop}: SprintsContainerProps) => {
    
    return (
         sprints.map((sprint) => {
            return <SprintItem sprint={sprint} /> 
        })
    )
       
    
}