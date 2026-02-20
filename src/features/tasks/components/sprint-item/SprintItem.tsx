import type { Sprint } from "../../model/sprint.model";

export const SprintItem = ({ sprint }: {sprint: Sprint}) => {
    return <h1>{sprint.name}</h1>
}