import "./_tasks-list-header.scss";

export const TasksListHeader = () => {
    return <div className="tasks-list-header task-grid">
            <div className="task-list-item__name">Nam</div>
            <div className="task-list-item__description">Description</div>
            <div className="task-list-item__assignee">Assignee</div>
            <div className="task-list-item__reporter">Reporter</div>
            <div className="task-list-item__priority">Priority</div>
            <div className="task-list-item__status">Status</div>
            <div className="task-list-item__resolution">Resolution</div>
            <div className="task-list-item__updated">Updated</div>
            <div className="task-list-item__due-date">Due date </div>
            <div className="task-list-item__created-at">CreatedAt</div>
    </div>
}