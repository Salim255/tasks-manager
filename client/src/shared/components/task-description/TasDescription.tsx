import "./_task-description.scss";

export const TaskDescription = ({ description }: { description?: string }) => {
  return (
    <span
      className="task-description">
      { description || "-" }
    </span>
  );
};