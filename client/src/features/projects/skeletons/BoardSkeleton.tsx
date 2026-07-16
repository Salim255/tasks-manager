import { BoardColumnSkeleton } from "./BoardColumnSkeleton";

export const BoardSkeleton = () => {
  return (
    <section className="board">
      <BoardColumnSkeleton title="To Do" />
      <BoardColumnSkeleton title="In Progress" />
      <BoardColumnSkeleton title="Done" />
    </section>
  );
};
