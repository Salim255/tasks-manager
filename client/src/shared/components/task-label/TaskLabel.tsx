import "./_task-label.scss";

export const TaskLabel = ({ name }: { name: string }) => {
  return (
    <span
      className="task-label"
      title={name}
    >
      {name}
    </span>
  );
};