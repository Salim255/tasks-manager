import type { Sprint } from "../../model/sprint.model";
import { SprintItem } from "../sprint-item/SprintItem";

export const SprintsContainer = ({sprints}:{sprints: Sprint[]}) => {
    return (
         sprints.map((sprint) => {
            return <SprintItem sprint={sprint} /> 
        })
    )
       
    
}