import "./_task-label.scss";


export const TaskLabel = ({name}:{name: string}) => {
    return (
        <div className="task-label">
            {name}
        </div>
    )
}