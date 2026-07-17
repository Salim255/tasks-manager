import { BoardColumnSkeleton } from "./BoardColumnSkeleton";

export const BoardSkeleton = () => {
  return (
    <section className="board">
      <BoardColumnSkeleton />
      <BoardColumnSkeleton  />
      <BoardColumnSkeleton />
    </section>
  );
};
