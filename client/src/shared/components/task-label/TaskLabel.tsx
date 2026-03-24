import "./_task-label.scss";

export const TaskLabel = ({label, name}:{label: string; name: string}) => {
    return (
        <div className="task-label">
            hello from task labe {label} {name}
        </div>
    )
}