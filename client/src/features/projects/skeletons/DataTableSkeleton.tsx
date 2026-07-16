import { TableHeaderSkeleton } from "./TableHeaderSkeleton";
import { TableRowSkeleton } from "./TableRowSkeleton";

export const DataTableSkeleton = () => {
  return (
    <div className="data-table-container">
      <div className="data-table-scroll scroll-bar">

        <div className="data-table data-table--skeleton">

          <TableHeaderSkeleton />

          <div className="data-table__body">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </div>

        </div>

      </div>
    </div>
  );
};
