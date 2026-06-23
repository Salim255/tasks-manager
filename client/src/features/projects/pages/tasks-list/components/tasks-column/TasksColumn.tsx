import "./_tasks-column.scss"

export const TasksColumn =({title, tasks}: {
  title: string;
  tasks: string[];
}) =>  {
  return (
    <div className="tasks-column">
      <div className="tasks-column__header">
        {title}
      </div>

      {tasks.map((value, index) => (
        <div
          key={index}
          className="tasks-column__cell"
        >
          {value}
        </div>
      ))}
    </div>
  );
}