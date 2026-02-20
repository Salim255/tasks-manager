import './_sprint-item.scss';
import type { Sprint } from "../../model/sprint.model";


export const SprintItem = ({ sprint }: {sprint: Sprint}) => {
    return <div className="sprint-item" >
        <div>header {sprint.name}</div>
        <div> 
            {
                sprint.tasks.map((task) => {
                    return <h1> {task.title}</h1>
                })
            }
        </div>

        <div>footer</div>
    </div>
}