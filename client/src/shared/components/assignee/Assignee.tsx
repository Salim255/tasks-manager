import { GoPerson } from "react-icons/go";


export const Assignee = ({assigneeId}: {assigneeId: string | undefined}) => {
    return <div className="assignee">
        <GoPerson /> { assigneeId ?? 'unassigned' }
    </div>
}