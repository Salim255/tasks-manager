import './_sprint-item.scss';
import type { Sprint } from "../../model/sprint.model";


export const SprintItem = ({ sprint }: {sprint: Sprint}) => {
    return <div className="sprint-item" >
        <div>header</div>
        <div> {sprint.name}</div>
        <div>footer</div>
    </div>
}