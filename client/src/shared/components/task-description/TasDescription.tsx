import "./_task-description.scss";

export const TaskDescription = ({ description }: { description: string | null }) => {
  return (
    <span
      className="task-description">
      { description || "-" }
    </span>
  );
};