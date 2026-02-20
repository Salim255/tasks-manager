import type { Sprint } from "../../model/sprint.model";

export const SprintsContainer = ({sprints}:{sprints: Sprint[]}) => {
    return (
         sprints.map((sprint) => {
            return <h1> {sprint.name }</h1>
        })
    )
       
    
}