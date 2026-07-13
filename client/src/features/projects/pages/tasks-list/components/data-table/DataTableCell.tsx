import { flexRender } from "@tanstack/react-table";

import type { Cell } from "@tanstack/react-table";

type DataTableCellProps<TData> = {
    cell: Cell<TData, unknown>;
};

export const DataTableCell = <TData,>({
    cell,
}: DataTableCellProps<TData>) => {

    return (
        <div
            className="data-table__cell"
            style={{
                width: cell.column.getSize(),
            }}
        >
            {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
            )}
        </div>
    );

};